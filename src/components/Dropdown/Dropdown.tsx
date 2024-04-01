import { defineComponent, computed, Fragment, type PropType } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'

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
  setup(props, { slots }) {
    const options = computed(() => {
      return props.menuOptions.map(item => {
        return (
          <Fragment key={item.key}>
            {item.divided ? <li role="separator" class="divided-placeholder" /> : ''}
            <li class="x-dropdown__item" id={`dropdown-item-${item.key}`}>
              {item.label}
            </li>
          </Fragment>
        )
      })
    })

    return () => (
      <div class="x-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
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
