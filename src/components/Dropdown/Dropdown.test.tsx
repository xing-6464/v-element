import { vi, describe, test, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from './Dropdown.vue'
import { h } from 'vue'
import type { MenuOption } from './types'

const options: MenuOption[] = [
  {
    key: 1,
    label: h('b', 'item1'),
  },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' },
]

vi.mock('@popperjs/core')

const onSelect = vi.fn()
const onVisibleChange = vi.fn()
describe('test Dropdown component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic func', async () => {
    const wrapper = mount(
      () => (
        <Dropdown
          trigger="click"
          menuOptions={options}
          onSelect={onSelect}
          onVisible-change={onVisibleChange}
        >
          <button id="btn">content</button>
        </Dropdown>
      ),
      {
        attachTo: document.body,
      }
    )

    const buttonEl = wrapper.find('#btn')
    expect(wrapper.find('.x-tooltip').exists()).toBeTruthy()
    expect(wrapper.find('.x-dropdown__item').exists()).toBeFalsy()
    buttonEl.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.x-dropdown__item').exists()).toBeTruthy()
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    wrapper.find('#dropdown-item-1').trigger('click')
    await vi.runAllTimers()
    expect(onSelect).toHaveBeenCalledWith(options[0])
    expect(onVisibleChange).toHaveBeenCalledWith(false)

    buttonEl.trigger('click')
    await vi.runAllTimers()
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    expect(wrapper.find('.x-dropdown__item').exists()).toBeTruthy()
    expect(wrapper.get('#dropdown-item-1').text()).toBe('item1')

    wrapper.find('#dropdown-item-2').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.x-dropdown__item').exists()).toBeTruthy()

    buttonEl.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.x-dropdown__item').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })

  test('hover function', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Dropdown
            trigger="hover"
            menuOptions={options}
            onSelect={onSelect}
            onVisible-change={onVisibleChange}
          >
            <button id="btn">content</button>
          </Dropdown>
        </div>
      ),
      {
        attachTo: document.body,
      }
    )

    onSelect.mockClear()
    onVisibleChange.mockClear()

    // const outsideEl = wrapper.find('#outside')
    const insideEl = wrapper.find('.x-tooltip__trigger')
    const outsideEl = wrapper.find('.x-tooltip')
    expect(insideEl.exists).toBeTruthy()
    expect(wrapper.find('.x-dropdown__item').exists()).toBeFalsy()

    insideEl.trigger('mouseenter')
    await vi.runAllTimers()
    expect(wrapper.find('.x-dropdown__item').exists()).toBeTruthy()
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    outsideEl.trigger('mouseleave')
    await vi.runAllTimers()
    expect(wrapper.find('.x-dropdown__item').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenCalledWith(false)
  })
})
