import type { InjectionKey } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

export type FormRules = Record<string, FormItemRule[]>

export interface FormItemProps {
  label: string
  prop?: string
}

export interface FormItemRule extends RuleItem {
  trigger?: string
}

export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError | null
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

export interface FormItemContext {
  validate: (trigger?: string) => Promise<any>
  prop: string
  resetField(): void
  clearValidate(): void
}

export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error'
  errorMsg: string
  loading: boolean
}

export interface FormInstance {
  validate: () => Promise<any>
  resetFields: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}
export interface FormItemInstance {
  validateStatus: ValidateStatusProp
  validate: (trigger?: string) => Promise<any>
  resetField: () => void
  clearValidate: () => void
}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
