import { describe, expect, test } from 'vitest'
import { closeAll, createMessage } from './method'
import { nextTick } from 'vue'

export const rAF = async () => {
  return new Promise(res => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

function getTopValue(el: Element) {
  const style = window.getComputedStyle(el)
  const topValue = style.getPropertyValue('top')
  return Number.parseFloat(topValue)
}
describe('createMessage', () => {
  test('调用方法应该创建对应的 Message 组件', async () => {
    const instance = createMessage({ message: 'hello world', duration: 0 })
    await rAF()
    expect(document.querySelector('.x-message')).toBeTruthy()
    instance.destory()
    await rAF()
    expect(document.querySelector('.x-message')).toBeFalsy()
  })

  test('多次调用方法应该创建多个实例', async () => {
    createMessage({ message: 'hello world', duration: 0 })
    createMessage({ message: 'hello world', duration: 0 })
    await rAF()
    const element = document.querySelectorAll('.x-message')
    expect(element.length).toBe(2)
    closeAll()
    await rAF()
    expect(document.querySelector('.x-message')).toBeFalsy()
  })

  test('创建多个实例应该设置正确的 offset ', async () => {
    createMessage({ message: 'hello world', duration: 0, offset: 100 })
    createMessage({ message: 'hello world1', duration: 0, offset: 50 })
    await rAF()
    const element = document.querySelectorAll('.x-message')
    expect(element.length).toBe(2)
    const firstElementTop = getTopValue(element[0])
    const secondElementTop = getTopValue(element[1])
    // 在js-dom中，对应的 height 为 0
    expect(firstElementTop).toBe(100)
    expect(secondElementTop).toBe(150)
  })
})
