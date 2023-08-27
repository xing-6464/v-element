<script setup lang="ts">
import XButton from './components/Button/Button.vue'


</script>

<template>
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
