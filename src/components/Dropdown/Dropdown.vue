<template>
  <div class="x-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
    <slot />
    <template #content>
      <ul class="x-dropdown__menu">
        <template v-for="item in menuOptions" :key="item.key">
          <li
            v-if="item.divided"
            role="separator"
            class="divided-placeholder"
          />
          <li
            class="x-dropdown__item"
            @click="itemClick(item)"
            :class="{'is-disabled': item.disabled, 'is-divided': item.divided}"
            :id="`dropdown-item-${item.key}`"
          >
            <RenderVNode :v-node="item.label" />
          </li>
        </template>
      </ul>
    </template>
  </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import type {DropdownEmits, DropdownInstance, DropdownProps, MenuOption} from './types'
import type {TooltipInstance} from '../Tooltip/types'
import RenderVNode from '../Common/RenderVNode'

defineOptions({
  name: 'XDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>

const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

const itemClick = (e: MenuOption) => {
  if (e.disabled) return
  emits('select', e)
  if (props.hideAfterClick) {
    console.log('hide')
    tooltipRef.value?.hide()
  }
}

defineExpose<DropdownInstance>({
  show: tooltipRef.value?.show,
  hide: tooltipRef.value?.hide 
})
</script>
