<template>
  <div
    class="x-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading
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
    {{ innerValue }} -- {{ itemRules }}
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide, reactive } from 'vue'
import Schema from 'async-validator'
import { isNil } from 'lodash-es'
import { formContextKey, formItemContextKey } from './types'
import type { FormItemContext, FormItemProps, FormValidateFailure } from './types'

defineOptions({
  name: 'XFormItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)
const validateStatus = reactive({
  state: 'init',
  errorMsg: '',
  loading: false
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
    validator
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
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
}
const context: FormItemContext = {
  validate
}
provide(formItemContextKey, context)
</script>
