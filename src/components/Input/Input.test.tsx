import { VueWrapper, mount } from '@vue/test-utils'
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
        type: 'text',
        modelValue: ''
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
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })

  it('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    }) as VueWrapper<any>
    // 初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('test')
    // 更新值
    // setValue 是组合事件会触发 input 以及 change
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])
    // v-model 的异步更新
    await wrapper.setProps({ modelValue: 'prop update' })
    expect(wrapper.props('modelValue')).toBe('prop update')
  })

  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // 不出现对应的 Icon 区域
    expect(wrapper.find('.x-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    // 出现Icon区域
    expect(wrapper.find('.x-input__clear').exists()).toBeTruthy()
    await wrapper.get('.x-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    // 点击值为空不仅会触发 clear 还会触发 input 和 change事件
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()).toHaveProperty('clear')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  it('支持切换密码显示', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        showPassword: true,
        type: 'text'
      },
      global: {
        stubs: ['Icon']
      }
    })

    // 不出现对应的 Icon 区域，因为当前值为空
    expect(wrapper.find('.x-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')

    // 出现 Icon 区域，并且Icon为特点的图标
    await input.setValue('123')
    const eyeIcon = wrapper.find('.x-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')

    // 点击值会切换 input 类型，并且图标的 Icon 会切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.x-input__password').attributes('icon')).toBe('eye')
  })
})
