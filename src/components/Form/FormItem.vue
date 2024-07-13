<template>
  <div
    class="x-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired
    }"
  >
    <label class="x-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="x-form-item__content">
      <slot :validate="validate" />
      <div class="x-form-item__error-msg" v-if="validateStatus.state === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide, reactive, onMounted, onUnmounted } from 'vue'
import Schema from 'async-validator'
import { isNil } from 'lodash-es'
import { formContextKey, formItemContextKey } from './types'
import type { FormItemContext, FormItemProps, FormValidateFailure } from './types'

defineOptions({
  name: 'XFormItem'
})
let initialValue: any = null
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)
const validateStatus = reactive({
  state: 'init',
  errorMsg: '',
  loading: false
})

const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required)
})
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  }
  return null
})

const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && !isNil(rules[props.prop])) {
    return rules[props.prop]
  }
  return []
})

const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}
const validate = (trigger?: string) => {
  const modelName = props.prop
  const triggerRules = getTriggerRules(trigger)
  if (triggerRules.length === 0) return true

  if (modelName) {
    const validator = new Schema({
      [modelName]: triggerRules
    })
    validateStatus.loading = true
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((e: FormValidateFailure) => {
        const { errors } = e
        validateStatus.state = 'error'
        validateStatus.errorMsg =
          Array.isArray(errors) && errors.length > 0 ? errors[0].message || '' : ''

        console.log(e.errors)
        return Promise.reject(e)
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}
const clearValidate = () => {
  validateStatus.state = 'init'
  validateStatus.errorMsg = ''
  validateStatus.loading = false
}
const resetField = () => {
  clearValidate()

  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue
  }
}
const context: FormItemContext = {
  validate,
  prop: props.prop || '',
  clearValidate,
  resetField
}
provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initialValue = innerValue.value
  }
})

onUnmounted(() => {
  formContext?.removeField(context)
})
</script>
