<template>
  <div class="x-tooltip">
    <div class="x-tooltip__trigger" ref="triggerNode" @click="togglePopper">
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
import { ref, watch } from 'vue'
import type { TooltipEmits, TooltipProps } from './types'
import { createPopper, type Instance } from '@popperjs/core'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom'
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null

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

function togglePopper() {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

</script>
