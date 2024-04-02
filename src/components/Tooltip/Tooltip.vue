<template>
  <div class="x-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="x-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="x-tooltip__popper" ref="popperNode">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import { createPopper, type Instance } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside'
import { debounce } from 'lodash-es'

defineOptions({
  name: 'XTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  closeDelay: 0,
  openDelay: 0
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})

watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' }
)

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      //  clear the events
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)

watch(
  () => props.manual,
  (newV) => {
    if (newV) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)
const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)
const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})
function open() {
  openTimes++
  isOpen.value = true
  emits('visible-change', true)
}

function close() {
  closeTimes++
  isOpen.value = false
  emits('visible-change', false)
}

function attachEvents() {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

if (!props.manual) {
  attachEvents()
}

function togglePopper() {
  if (!isOpen.value) {
    openFinal()
  } else {
    closeFinal()
  }
}

onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>
