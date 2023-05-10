<template>
  <div v-show="ifScroll" class="scroll">
    <button class="up-button" @click="scrollToTop"><svg-icon name="arrow" /></button>
  </div>
</template>

<script>
export default {
  name: 'BScrollToTop',
  data() {
    return {
      ifScroll: false,
    };
  },
  mounted() {
    this.scrollHandler = (event) => (this.ifScroll = window.scrollY > 380);
    window.addEventListener('scroll', this.scrollHandler);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="stylus" scoped>
.scroll
  position fixed
  bottom 120px
  right 32px
  z-index 99
.up-button
    background $dark
    width 50px
    height 50px
    border-radius 50%
    display flex
    align-items center
    justify-content center
    position relative
    z-index 100
    box-shadow 0px 4px 10px rgb(0 0 0 / 60%)
    @media $xs
      width 42px
      height 42px
    svg
      width 24px
      height 24px
      fill $white
      transform rotate(180deg)
</style>
