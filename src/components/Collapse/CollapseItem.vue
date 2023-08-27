<template>
  <div class="x-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="x-collapse-item__header" :id="`item-header-${name}`">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="x-collapse-item__content" :id="`item-content-${name}`">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CollapseItemProps } from './types'

defineOptions({
  name: 'XCollapseItem',
})
defineProps<CollapseItemProps>()
</script>
