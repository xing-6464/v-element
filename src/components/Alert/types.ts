export interface AlertProps {
  content?: string
  type?: 'primary' | 'info' | 'warning' | 'danger' | 'success'
  effect?: 'light' | 'dark'
  closable?: boolean
}

export interface AlertEvents {
  (e: 'close'): void
}
