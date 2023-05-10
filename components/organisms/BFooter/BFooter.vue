<template>
  <div class="footer"></div>
</template>

<script>
export default {
  name: 'BFooter',
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped>
.footer
  display flex
  flex-direction column
  align-items center
  justify-content center
  background-image url('~/static/svg/footer.svg')
  background-position bottom
  background-repeat no-repeat
  background-size auto
  width 100%
  height 548px
</style>
