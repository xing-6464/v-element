<template>
  <div class="x-tooltip" v-on="outerEvents">
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
import { reactive, ref, watch } from 'vue'
import type { TooltipEmits, TooltipProps } from './types'
import { createPopper, type Instance } from '@popperjs/core'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover'
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

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
attachEvents()

function togglePopper() {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

</script>
