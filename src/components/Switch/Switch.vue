<template>
  <div
    class="x-switch"
    :class="{
      [`x-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
    @click="switchValue"
  >
    <input
      class="x-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
    />
    <div class="x-switch__core">
      <div class="x-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({
  name: 'XSwitch',
  inheritAttrs: false
})
const props = defineProps<SwitchProps>()
const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
// 现在是否被选中
const checked = computed(() => innerValue.value)

const switchValue = () => {
  if (props.disabled) return
  innerValue.value = !checked.value
  emits('update:modelValue', innerValue.value)
  emits('change', innerValue.value)
}
</script>
