<template>
  <button ref="_ref" class="vx-button"
    :class="{ [`vk-button--${type}`]: type, 'is-plain': plain, 'is-round': round, 'is-circle': circle, 'is-disabled': disabled }"
    :disabled="disabled" :autofocus="autofocus" :type="nativeType">
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps, ButtonInstance } from './types'

defineOptions({
  name: 'VxButton'
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>
