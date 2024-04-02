---
title: Button | V-Element
description: Button 组件文档
---

# Button 按钮
常用的操作按钮

## 基础用法
使用 `type`, `plain`, `round` 和 `circle` 来定义按钮的样式

<script setup>
import { ref } from 'vue'
import Button from '../../src/components/Button/Button.vue'
const count = ref(0)
</script>

The count is: {{ count }}
<Button type="primary" @click="count++">Increase</Button>

