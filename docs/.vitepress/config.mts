import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { link } from 'node:fs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'V Element',
  description: 'A VitePress element',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: '主页', link: '/' }],
    sidebar: [
      {
        text: '开始使用',
        link: '/components/start'
      },
      {
        text: 'Button 按钮',
        link: '/components/button'
      },
      {
        text: 'Collapse 折叠面板',
        link: '/components/collapse'
      },
      {
        text: 'Tooltip 文字提示',
        link: '/components/tooltip'
      },
      {
        text: 'Dropdown 下拉菜单',
        link: '/components/dropdown'
      },
      {
        text: 'Message 消息提示',
        link: '/components/message'
      },
      {
        text: 'Input 输入框',
        link: '/components/input'
      },
      {
        text: 'Switch 开关',
        link: '/components/switch'
      },
      {
        text: 'Select 选择器',
        link: '/components/select'
      },
      {
        text: 'Form 表单',
        link: '/components/form'
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
