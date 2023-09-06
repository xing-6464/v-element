<template>
  <i class="x-icon">
    <font-awesome-icon v-bind="$props" />
  </i>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types.ts'

defineOptions({
  name: 'VIcon',
  inheritAttrs: false
})
defineProps<IconProps>()
</script>
