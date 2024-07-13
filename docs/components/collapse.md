---
title: Collapse | V-Element
description: Collapse 组件文档
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件基础用法"></preview>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<preview path="../demo/Collapse/Accordion.vue" title="手风琴效果" description="Collapse 组件基础用法"></preview>

## Collapse 属性

| Name                  | Description                        | Type                                                 | Accepted Values | Default |
| :-------------------- | :--------------------------------- | :--------------------------------------------------- | :-------------- | :------ |
| model-value / v-model | currently active panel             | string (accordion mode) / array (non-accordion mode) | —               | —       |
| accordion             | whether to activate accordion mode | boolean                                              | —               | false   |

## Collapse 事件

| Name   | Description                        | Parameters                                                          |
| :----- | :--------------------------------- | :------------------------------------------------------------------ |
| change | triggers when active panels change | (activeNames: array (non-accordion mode) / string (accordion mode)) |

## Collapse 插槽

| Name | Description               | Subtags       |
| :--- | :------------------------ | :------------ |
| -    | customize default content | Collapse Item |

## Collapse Item 属性

| Name     | Description                        | Type          | Accepted Values | Default |
| :------- | :--------------------------------- | :------------ | :-------------- | :------ |
| name     | unique identification of the panel | string/number | —               | —       |
| title    | title of the panel                 | string        | —               | —       |
| disabled | disable the collapse item          | boolean       | —               | —       |

## Collapse Item 插槽

| Name  | Description                    |
| :---- | :----------------------------- |
| —     | content of Collapse Item       |
| title | content of Collapse Item title |
