<template>
  <form class="x-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import type { FormProps } from './types'

defineOptions({
  name: 'XForm'
})

defineProps<FormProps>()
</script>
