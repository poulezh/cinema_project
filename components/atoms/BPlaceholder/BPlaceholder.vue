<template>
  <div class="card-placeholder">
    <p class="card-placeholder-img">
      <img src="/img/logo.png" alt="" />
    </p>
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
.card-placeholder {
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color $anthracite
  padding 20px
  height 455px
  max-width 315px
  border-radius 6px
}

.card-placeholder img {
  width 100%
  max-width 200px
  height auto
  margin-bottom 10px
}

.card-placeholder-text {
  font-size 14px
  text-align center
  color #999
}
</style>
