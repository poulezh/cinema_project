<template>
  <div class="no-cards">
    <div class="no-cards__img">
      <img src="/img/comedy.png" alt="" />
    </div>
    <div class="no-cards__text">Упс... Тут пока фильмов нет.</div>
  </div>
</template>

<script>
export default {
  name: 'BNoFilms',
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="stylus" scoped>
.no-cards
  width 320px
  padding 24px 12px
  text-align center
  margin 32px auto
  display flex
  flex-direction column
  align-items center
  justify-content center
  &__img
    width 96px
    height 96px
      img
        objectFit(100%,cover)
</style>
