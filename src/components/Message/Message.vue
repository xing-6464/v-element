<template>
  <div
    class="x-message" 
    v-show="visible"
    :class="{
      [`x-message--${type}`]: type,
      'is-close': showClose
    }"
    role="alert"
  >
    <div class="x-message__content">
      <slot>
        <RenderVNode :vNode="message" v-if="message" />
      </slot>
    </div>
    <div class="x-message__close" v-if="showClose">
      <Icon icon="xmark" @click.stop="visible = false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MessageProps } from './types'
import RenderVNode from '../Common/RenderVNode'
import Icon from '../Icon/Icon.vue'
import { ref, onMounted } from 'vue';

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000
})
const visible = ref(false)

function startTime() {
  if (props.duration === 0) return
  setTimeout(() => {
    visible.value = false
  }, props.duration)
}

onMounted(() => {
  visible.value = true
  startTime()
})


</script>

<style>
.x-message {
  width: max-content;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  border: 1px solid blue;
}
</style>
