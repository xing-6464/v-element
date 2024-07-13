# V-Element 一个基于 Vue3 的 UI 组件库

v-element 是一套基于 Vue3 的 UI 组件库，提供了一些常用的组件，帮助开发者快速开发基于 Vue3 的项目。

---

# 安装

```bash
npm i @pdx6464/v-element --save
```

---

# 使用

**开始使用**

```js
// 引入组件
import XElement from '@pdx6464/x-element'
// 引入样式
import '@pdx6464/x-element/dist/index.css'

import App from './App.vue'

createApp(App).use(XElement).mount('#app')
```

```vue
<template>
  <x-button>我是 XButton</x-button>
</template>
```

**单个组件引入**

X Element 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <Button>我是 XButton</Button>
</template>
<script>
import { Button } from ' @pdx6464/x-element'
export default {
  components: { Button }
}
</script>
```
