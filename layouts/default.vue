<template>
  <div class="layout">
    <BHeader />
    <Nuxt />
    <BScrollToTop />
    <BFooter />
  </div>
</template>

<script>
import BHeader from '~/components/organisms/BHeader/BHeader';
import BFooter from '~/components/organisms/BFooter/BFooter';
import BScrollToTop from '~/components/atoms/BScrollToTop/BScrollToTop';

export default {
  components: {
    BHeader,
    BFooter,
    BScrollToTop,
  },
};
</script>

<style></style>
