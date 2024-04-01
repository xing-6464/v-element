import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import ToolTip from './ToolTip.vue'

vi.mock('@popperjs/core')

const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic test', async () => {
    const wrapper = mount(
      () => {
        return (
          <div>
            <div id="outside"></div>
            <ToolTip content="hello tooltip" trigger="click" onVisible-change={onVisibleChange}>
              <button id="trigger">Trigger</button>
            </ToolTip>
          </div>
        )
      },
      {
        attachTo: document.body,
      }
    )
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBeTruthy()
    expect(wrapper.find('.x-tooltip__popper').exists()).toBeFalsy()
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.x-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.get('.x-tooltip__popper').text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.x-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })

  test('hover test', async () => {
    const wrapper = mount(
      () => {
        return (
          <div>
            <div id="outside"></div>
            <ToolTip content="hello tooltip" trigger="hover" onVisible-change={onVisibleChange}>
              <button id="trigger">Trigger</button>
            </ToolTip>
          </div>
        )
      },
      {
        attachTo: document.body,
      }
    )
    onVisibleChange.mockClear()
    const triggerEl = wrapper.find('.x-tooltip__trigger')
    expect(triggerEl.exists()).toBeTruthy()

    triggerEl.trigger('mouseenter')
    await vi.runAllTimers()
    const popperEl = wrapper.find('.x-tooltip__popper')
    expect(popperEl.text()).toBe('hello tooltip')
    expect(onVisibleChange).toHaveBeenCalled()
    popperEl.trigger('mouseenter')
    await vi.runAllTimers()
    expect(popperEl.text()).toBe('hello tooltip')

    wrapper.get('.x-tooltip').trigger('mouseleave')
    await vi.runAllTimers()
    expect(wrapper.find('.x-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
