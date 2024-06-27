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
          ref="inputRef"
          v-bind="attrs"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="x-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="x-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          />
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
        ref="inputRef"
        v-bind="attrs"
        :disabled="disabled"
        v-model="innerValue"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, watch, type Ref, nextTick } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { InputEmits, InputProps, InputInstance } from './types'

defineOptions({
  name: 'XInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off'
})
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const inputRef = ref() as Ref<HTMLInputElement>
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

const NOOP = () => {}
const keepFocus = async () => {
  await nextTick()
  inputRef.value.focus()
}
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
  emits('input', innerValue.value)
}
const handleChange = () => {
  emits('change', innerValue.value)
}
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emits('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emits('blur', e)
}
const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
  emits('clear')
  emits('change', '')
  emits('input', '')
}

defineExpose<InputInstance>({
  ref: inputRef.value
})
</script>
