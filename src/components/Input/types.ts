export interface InputProps {
  type: string
  modelValue: string
  size?: 'large' | 'small'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  // input 事件是 input的值发生变化就算
  (e: 'input', value: string): void
  // change 事件是 input的值发生改变，并且blur才触发
  (e: 'change', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}
