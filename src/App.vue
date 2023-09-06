<script setup lang="ts">
import { ref } from 'vue';
import XButton from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'

const openValue = ref(['a'])
</script>
<template>
  <Icon icon="fa-solid fa-user-secret" />
  <Icon icon="arrow-up" size="2xl" spin />
  <main>
    <XButton plain>Plain Test</XButton>
    <XButton round>Round</XButton>
    <XButton circle>VK</XButton>
    <XButton disabled>Disabled</XButton>
    <br />
    <br />
    <XButton type="primary">Primary</XButton>
    <XButton type="success">Primary</XButton>
    <XButton type="danger">Primary</XButton>
    <br />
    <br />
    <XButton type="info" size="large">Primary</XButton>
    <XButton type="info" size="small">Primary</XButton>
    <br />
    <br />
    <XButton type="primary" plain>Primary</XButton>
    <XButton type="success" plain>Primary</XButton>
    <XButton type="danger" plain>Primary</XButton>
    <br />
    <br />
    <XButton type="primary" round>Primary</XButton>
    <XButton type="success" round>Primary</XButton>
    <XButton type="danger" round>Primary</XButton>
    <br />
    <br />
    <XButton type="primary" circle>Primary</XButton>
    <XButton type="success" circle>Primary</XButton>
    <XButton type="danger" circle>Primary</XButton>
    <br />
    <br />

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
