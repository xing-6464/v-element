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
  validate: (trigger?: string) => any
  prop: string
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
