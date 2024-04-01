import { defineComponent, computed, Fragment, type PropType, ref } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'
import type { TooltipInstance } from '../Tooltip/types'

export default defineComponent({
  name: 'XDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover',
    },
    transition: {
      type: String,
      default: 'fade',
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
    closeAfterClick: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['visible-change', 'select'],
  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null)
    const options = computed(() => {
      return props.menuOptions.map(item => {
        return (
          <Fragment key={item.key}>
            {item.divided ? <li role="separator" class="divided-placeholder" /> : ''}
            <li
              class={{
                'x-dropdown__item': true,
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })

    const visibleChange = (e: boolean) => {
      emit('visible-change', e)
    }
    const itemClick = (e: MenuOption) => {
      if (e.disabled) return
      emit('select', e)
      if (props.closeAfterClick) {
        tooltipRef.value?.hide()
      }
    }

    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    })

    return () => (
      <div class="x-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          ref={tooltipRef}
          onVisible-change={visibleChange}
        >
          {{
            default: () => slots.default?.(),
            content: () => <ul class="x-dropdown__menu">{options.value}</ul>,
          }}
        </Tooltip>
      </div>
    )
  },
})
