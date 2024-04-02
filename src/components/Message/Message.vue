<template>
  <Transition :name="transitionName" @afterLeave="destoryComponent" @enter="updateHight">
    <div
      ref="messageRef"
      class="x-message" 
      v-show="visible"
      :class="{
        [`x-message--${type}`]: type,
        'is-close': showClose
      }"
      role="alert"
      :style="cssStyle"
      @mouseenter="clearTime"
      @mouseleave="startTime"
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
  </Transition>
</template>

<script lang="ts" setup>
import RenderVNode from '../Common/RenderVNode'
import Icon from '../Icon/Icon.vue'
import { ref, onMounted,computed } from 'vue'
import type { MessageProps } from './types'
import { getLastBottomOffset } from './method'
import useEventListener from '../../hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})
const visible = ref(false)
const messageRef = ref<HTMLElement | null>(null)
// 计算高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 这个element的top
const topOffset = computed(() => props.offset + lastOffset.value)
// 这个 element 为下一个 element 预留 offset，也就是它最低端 bottom的值
const bottomOffset = computed(() => parseInt(height.value + topOffset.value))
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)
// watch(visible, (newVal) => {
//   if (!newVal) {
//     props.onDestory()
//   }
// })
function destoryComponent() {
  props.onDestory()
}

function updateHight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}

let timer: NodeJS.Timeout
function startTime() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}

function clearTime() {
  clearTimeout(timer)
}

onMounted(async () => {
  visible.value = true
  startTime()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})

defineExpose({
  bottomOffset,
  visible
})
</script>