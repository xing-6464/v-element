import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Switch from './Switch.vue'

const onChange = vi.fn()
describe('Switch', () => {
  test('基础功能测试', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
        size: 'large',
        onChange
      }
    })

    const element = wrapper.get('.x-switch')
    expect(element.classes()).toContain('x-switch--large')

    await element.trigger('click')
    expect(onChange).toBeCalledWith(false)
  })
  test('扩展功能测试', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: 'ON',
        inactiveText: 'OFF',
        activeText: 'ON',
        activeValue: 'ON',
        inactiveValue: 'OFF',
        onChange
      }
    })

    const element = wrapper.get('.x-switch')
    const text = wrapper.find('.x-switch__core-inner-text')
    expect(text.exists()).toBeTruthy()
    expect(text.text()).toBe('ON')

    await element.trigger('click')
    expect(text.text()).toBe('OFF')
    expect(onChange).toBeCalledWith('OFF')
  })
  test('disabled测试', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true,
        onChange
      }
    })

    vi.clearAllMocks()
    const element = wrapper.get('.x-switch')
    expect(element.classes()).toContain('is-disabled')

    await element.trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })
})
