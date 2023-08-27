<template>
  <button class="vx-button"
    :class="{ [`vk-button--${type}`]: type, 'is-plain': plain, 'is-round': round, 'is-circle': circle, 'is-disabled': disabled }"
    :disabled="disabled">
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from './types'

defineOptions({
  name: 'VxButton'
})
defineProps<ButtonProps>()
</script>

<style scoped></style>