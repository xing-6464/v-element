<script setup lang="ts">
import { ref, onMounted } from 'vue';
import XButton from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import Item from './components/Collapse/CollapseItem.vue'
import { createMessage } from './components/Message/method'


const openValue = ref(['a'])


onMounted(() => {
  createMessage({message: 'hello world', duration: 3000})
  createMessage({message: 'hello world world', duration: 0, type: 'success', showClose: true})
  createMessage({message: 'hello world world world', duration: 0, type: 'warning'})
})

</script>

<template>
  <!-- <Message message="hello message" :duration="0" :show-close="true" /> -->
  <main>
    <XButton plain type="primary">Plain Test</XButton>
    <XButton plain type="success">Plain Test</XButton>
    <XButton plain type="info">Plain Test</XButton>
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
