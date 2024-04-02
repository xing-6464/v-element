import type { VNode } from 'vue'

export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'error'
  onDestory: () => void
  offset?: number
}

export interface MessageContext {
  id: string
  vnode: VNode
  props: MessageProps
}

export type CreateMessageProps = Omit<MessageProps, 'onDestory'>
