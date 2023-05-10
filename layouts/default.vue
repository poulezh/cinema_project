<template>
  <div class="layout">
    <BHeader />
    <div class="main">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import BHeader from '~/components/organisms/BHeader/BHeader';

export default {
  components: {
    BHeader,
  },
};
</script>

<style></style>
