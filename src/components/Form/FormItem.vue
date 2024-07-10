<template>
  <div class="x-form-item">
    <label class="x-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="x-form-item__content">
      <slot></slot>
    </div>
    {{ innerValue }} -- {{ itemRules }}
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { isNil } from 'lodash-es'
import { formContextKey } from './types'
import type { FormItemProps } from './types'
defineOptions({
  name: 'XFormItem'
})
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)

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
</script>
