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
  </div>
</template>

<script setup lang="ts">
import type { FormItemProps } from './types'
defineOptions({
  name: 'XFormItem'
})
defineProps<FormItemProps>()
</script>
