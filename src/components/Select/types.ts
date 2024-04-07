import type { VNode } from 'vue'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  // v-model
  modelValue: string
  // 选项
  options: SelectOption[]
  // 一些基本表单属性
  placeholder: string
  disabled: boolean
  clearable?: boolean
  renderLabel?: RenderLabelFunc
}

export interface SelectStates {
  inputValue: string
  selectedOption: null | SelectOption
  mouseHover: boolean
}

export type RenderLabelFunc = (option: SelectOption) => {}

export interface SelectEmits {
  (e: 'change', value: string): void
  (e: 'update:modelValue', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
