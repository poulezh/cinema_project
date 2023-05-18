<template>
  <div class="top-page">
    <div class="title">Афиша</div>
    <div class="tab">
      <b-tabs :tabs="tabs" mod="affiche" @change="switchMovies" />
    </div>
  </div>
</template>

<script>
import BTabs from '~/components/atoms/BTabs/BTabs';

export default {
  name: 'BTopPage',
  components: {
    BTabs,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {
    switchMovies(tab) {
      this.$emit('change', tab);
    },
  },
};
</script>

<style lang="stylus" scoped>
.top-page
  & .title
    font-size 36px
    line-height 40px
    text-align center
    padding 40px 0 30px
    margin 0
  & .tab
    width 100%
    display flex
    align-items center
    justify-content: flex-start
    padding 0
    margin 0
    background $dark
    border-radius 12px 12px 0 0
    overflow hidden
</style>
