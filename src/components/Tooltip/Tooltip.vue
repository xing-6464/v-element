<template>
  <div class="x-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="x-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <div v-if="isOpen" class="x-tooltip__popper" ref="popperNode">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive, ref, watch } from 'vue'
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import { createPopper, type Instance } from '@popperjs/core'
import useClickOutside from '@/hooks/useClickOutside'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover'
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    close()
  }
})

watch(isOpen, (newVal) => {
  if (newVal) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement
      })
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post' })

watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    //  clear the events
    events = {}
    outerEvents = {}
    attachEvents()
  }
})

watch(() => props.manual, (newV) => {
  if (newV) {
    events = {}
    outerEvents = {}
  } else {
    attachEvents()
  }
})

function open() {
  isOpen.value = true
  emits('visible-change', true)
}

function close() {
  isOpen.value = false
  emits('visible-change', false)
}

function attachEvents() {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

!props.manual && attachEvents()

function togglePopper() {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  'show': open,
  'hide': close
})
</script>
