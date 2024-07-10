<template>
  <form class="x-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type { FormProps } from './types'
import { formContextKey } from './types'

defineOptions({
  name: 'XForm'
})
const props = defineProps<FormProps>()
provide(formContextKey, props)
</script>
