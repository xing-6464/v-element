<template>
  <form class="x-form">
    <slot />
    <button @click.prevent="validate">Submt</button>
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type { FormContext, FormItemContext, FormProps } from './types'
import { formContextKey } from './types'

defineOptions({
  name: 'XForm'
})
const props = defineProps<FormProps>()
const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}
const validate = () => {
  console.log('fields', fields)
}
provide(formContextKey, {
  ...props,
  addField,
  removeField
})
</script>
