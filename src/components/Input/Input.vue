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
      'is-suffix': $slots.suffix,
      'is-focus': isFocus
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
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          v-model="innerValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span v-if="$slots.suffix || showClear || showPasswordArea" class="x-input__suffix">
          <slot name="suffix" />
          <Icon icon="circle-xmark" v-if="showClear" class="x-input__clear" @click="clear" />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="x-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="x-input__password"
            @click="togglePasswordVisible"
          />
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
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { InputEmits, InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)

const showPasswordArea = computed(() => {
  return props.showPassword && !props.disabled && !!innerValue.value
})
const showClear = computed(() => {
  return props.clearable && !props.disabled && !!innerValue.value && isFocus.value
})

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value
  }
)
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}
const handleFocus = () => {
  isFocus.value = true
}
const handleBlur = () => {
  isFocus.value = false
}
const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
}
</script>
