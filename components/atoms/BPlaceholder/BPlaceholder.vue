<template>
  <div class="card-placeholder">
    <img src="/img/logo.png" alt="" />
  </div>
</template>

<script>
export default {
  name: 'BPlaceholder',

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="stylus" scoped>
.card-placeholder
  display flex
  justify-content center
  align-items center
  background-color $anthracite
  padding 20px
  max-height 455px
  height 100%
  max-width 315px
  width 100%
  border-radius 6px
  & img
    width 100%
    max-width 66px
    height auto
    margin-bottom 10px
</style>
