<template>
  <div class="x-alert" :class="{ [`x-bgColor--${type}`]: type }">
    <div>
      <slot>{{ content }}</slot>
    </div>
    <Icon icon="xmark" v-if="!closable" />
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue'
import type { AlertEvents, AlertProps } from './types'

defineOptions({ name: 'XAlert' })

defineProps<AlertProps>()
defineEmits<AlertEvents>()
</script>
