<template>
  <div
    class="x-input"
    :class="{
      [`x-input--${type}`]: type,
      [`x-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="x-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="x-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="x-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          class="x-input__inner"
          :type="type"
          :disabled="disabled"
          v-model="innerValue"
          @input="handleInput"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix" class="x-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="x-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="x-textarea__wrapper"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { InputEmits, InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}
watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value
  }
)
</script>
