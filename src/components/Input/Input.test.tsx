import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态 class， 查看 classses是否正确
    // 针对 v-if 是否渲染正确的标签以及内容
    // 针对 slots，是否渲染对应的 slots 内容
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text'
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    // classes
    expect(wrapper.classes()).toContain('x-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    // should render input
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.x-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.x-input__prepend').text()).toBe('prepend')

    expect(wrapper.find('.x-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.x-input__prefix').text()).toBe('prefix')

    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea'
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })
})
