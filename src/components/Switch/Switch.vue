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
      ref="input"
      class="x-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="x-switch__core">
      <div class="x-switch__core-inner">
        <span v-if="activeText || inactiveText" class="x-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="x-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({
  name: 'XSwitch',
  inheritAttrs: false
})
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwitchEmits>()

const input = ref<HTMLInputElement>()
const innerValue = ref(props.modelValue)
// 现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue)

watch(checked, (val) => {
  input.value!.checked = val
})

watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal
  }
)

const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}

onMounted(() => {
  input.value!.checked = checked.value
})
</script>
