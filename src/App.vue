<script setup lang="ts">
import { h, ref } from 'vue'
import XButton from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'


const openValue = ref(['a'])
const size = ref<any>('3x')
const trigger = ref<'click' | 'hover'>('click')
const options: MenuOption[] = [
  {
    key: 1,
    label: h('b', 'item1')
  },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' } 
]

const tooltipRef = ref<TooltipInstance | null>(null)


function open() {
  tooltipRef.value?.show()
}

function close() {
  tooltipRef.value?.hide()
}

setTimeout(() => {
  trigger.value = 'click' 
}, 2000)

setTimeout(() => {
  size.value = '2xl'
}, 2000)
</script>

<template>
    <Dropdown ref="tooltipRef" placement="bottom" :trigger="trigger" :menu-options="options" @visible-change="e => console.log(e)" @select="e => console.log(e)" >
      <img src="./assets/logo.svg" alt="hello" width="125" height="125">
    </Dropdown>
  <Icon icon="fa-solid fa-user-secret" />
  <Icon icon="arrow-up" :size="size" type="danger" color="#0e7a0d" />
  <main>
    <Alert content="this is Alert" type="primary" />
    <Alert content="this is Alert" type="info" closable />
    <Alert>
      <h1>saxinfad</h1>
      <p>sakldas</p>
    </Alert>
    <XButton plain @click="open">Plain Test</XButton>
    <XButton round @click="close">Round</XButton>
    <XButton circle>VK</XButton>
    <XButton disabled>Disabled</XButton>
    <br />
    <br />
    <XButton size="large" loading>Loading</XButton>
    <XButton size="large" icon="arrow-up">Icon</XButton>

    <Collapse v-model="openValue" accordion>
      <Item name="a">
        <template #title>
          <h1>nice a</h1>
        </template>
        <h1>heading title</h1>
        <div>this is content a</div>
      </Item>
      <Item name="b" title="nice b">
        <div>this is content b</div>
      </Item>
      <Item name="c" title="nice c" disabled>
        <div>this is content c</div>
      </Item>
    </Collapse>
    {{ openValue }}
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
