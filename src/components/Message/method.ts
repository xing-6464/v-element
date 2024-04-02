import { render, h, onUnmounted, nextTick } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import MessageConstructor from './Message.vue'

let seed = 1
let instances: MessageContext[] = []
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const destory = () => {
    instances = instances.filter(value => value.id !== id)
    render(null, container)
  }
  const newProps = {
    ...props,
    id,
    onDestory: destory,
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  // await nextTick()
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}
