<template>
  <div
    class="x-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      ref="tooltipRef"
      :popper-options="popperOptions"
      @click-outside="controlDropdown(false)"
      manual
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="x-input__clear"
            @click.stop="onClear"
            @mousedown.prevent="NOOP"
          />
          <Icon
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
            v-else
          />
        </template>
      </Input>
      <template #content>
        <div class="x-select__loading" v-if="states.loading"><Icon icon="spinner" spin /></div>
        <div class="x-select__nodata" v-else-if="filterable && filteredOptions.length === 0">
          no matching data
        </div>
        <ul class="x-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="x-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVNode :v-node="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

import Tooltip from '../Tooltip/Tooltip.vue'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'

import type { Ref } from 'vue'
import type { SelectProps, SelectEmits, SelectOption, SelectStates } from './types'
import type { TooltipInstance } from '../Tooltip/types'
import type { InputInstance } from '../Input/types'
import RenderVNode from '../Common/RenderVNode'
import { debounce, isFunction } from 'lodash-es'

const findOption = (val: string) => {
  const option = props.options.find((option) => option.value === val)
  return option ? option : null
}
defineOptions({
  name: 'XSelect'
})
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => []
})
const timeout = computed(() => (props.remote ? 300 : 0))
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref<InputInstance>()
const isDropdownShow = ref(false)
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1
})
watch(
  () => props.modelValue,
  (val) => {
    const option = findOption(val)
    Object.assign(states, {
      inputValue: option ? option?.label : '',
      selectedOption: option
    })
  }
)
// 绑定键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(false)
      } else {
        if (states.highlightIndex > -1 && filteredOptions.value[states.highlightIndex]) {
          itemSelect(filteredOptions.value[states.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      toggleDropdown()
      break
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      // states.highlightIndex = -1
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1
        } else {
          states.highlightIndex--
        }
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0
        } else {
          states.highlightIndex++
        }
      }
      break
    default:
      break
  }
}
const showClearIcon = computed(() => {
  // hover 上去
  // props.clearable 为true
  // 必须要有选项
  // Input 的值不能为空
  return (
    props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== ''
  )
})

const popperOptions = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles']
    }
  ]
} as any

const filteredOptions = ref(props.options)
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
  }
)

const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filteredOptions.value = await props.remoteMethod(searchValue)
    } catch (e) {
      console.error(e)
      filteredOptions.value = []
    } finally {
      states.loading = false
    }
  } else {
    filteredOptions.value = props.options.filter((opt) => opt.label.includes(searchValue))
  }
  states.highlightIndex = -1
}
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
const debounceOnFilter = debounce(onFilter, timeout.value)
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder
})

const NOOP = () => {}
const onClear = () => {
  states.selectedOption = null
  states.inputValue = ''
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter 模式 && 之前选择过对应的值
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
    }
    // 进行一次默认选项的生成
    if (props.filterable) {
      generateFilterOptions(states.inputValue)
    }
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
    // blur 时候 重新设置 inputValue
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
    states.highlightIndex = -1
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
  inputRef.value?.ref.focus()
}
</script>
