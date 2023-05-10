<template>
  <div class="header_wrapper">
    <header class="header container">
      <div class="header__left">
        <nuxt-link to="/" class="header__logo">logo</nuxt-link>
      </div>
      <div class="header__right">
        <div class="header__menu">
          <nuxt-link to="/schedule" class="header__menu-item">расписание</nuxt-link>
          <nuxt-link to="/affiche" class="header__menu-item">афиша</nuxt-link>
          <nuxt-link to="/about" class="header__menu-item">о кинотеатре</nuxt-link>
          <nuxt-link to="/faq" class="header__menu-item">вопрос-ответ</nuxt-link>
          <nuxt-link to="/help" class="header__menu-item">справка</nuxt-link>
          <nuxt-link v-if="!openSearch" to="/" class="header__menu-item">вернуть билет</nuxt-link>
        </div>
        <div v-if="openSearch" class="header__burger">
          <div class="header__menu-item burger">...</div>
          <div class="header__burger-menu">
            <nuxt-link to="/schedule" class="header__menu-item">расписание</nuxt-link>
            <nuxt-link to="/affiche" class="header__menu-item">афиша</nuxt-link>
            <nuxt-link to="/about" class="header__menu-item">о кинотеатре</nuxt-link>
            <nuxt-link to="/faq" class="header__menu-item">вопрос-ответ</nuxt-link>
            <nuxt-link to="/help" class="header__menu-item">справка</nuxt-link>
            <nuxt-link to="/" class="header__menu-item">вернуть билет</nuxt-link>
          </div>
        </div>
        <div class="header__search" :class="{ _search: openSearch }">
          <b-input v-if="openSearch" type="text" mod="search" />
          <button class="header__search-trigger" @click="search">
            <svg-icon name="search" />
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import BInput from '~/components/atoms/BInput/BInput';

export default {
  name: 'BHeader',
  components: {
    BInput,
  },
  data() {
    return {
      isMenu: false,
      openSearch: false,
    };
  },
  computed: {},
  methods: {
    search() {
      this.openSearch = !this.openSearch;
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  max-width 1560px
  width 100%
  height 80px
  margin 0 auto
  display flex
  justify-content space-between
  align-items center
  &_wrapper
    width 100%
    background $black
  &__right
    display flex
    align-items center
  &__menu
    display flex
    &-item
      fontSzLh(20,20)
      text-transform uppercase
      display flex
      height 80px
      align-items center
      padding 0 20px
      transition(all)
      +hover()
        background $red
        transition(all)
      @media $mdMinus
        fontSzLh(16,16)
        padding 0 14px
  &__burger
    transition(all)
    & .burger
      +hover()
        transition(all)
        background $greenLight
        .header__burger-menu
          display flex
          flex-direction column
          position absolute

    &-menu
      display none
  &__search
    cursor pointer
    height 80px
    display flex
    align-items center
    justify-content center
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 0 0 0 10px;
    background $dark
    position relative
    transition(all)
    &-trigger
      width 48px
      height 48px
      border-radius 50%
      background $dark
      position absolute
      right 0
    &._search
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 30px;
      height: 48px;
      width: 320px;
      transition(all)
    & svg
      fill $white
      width 18px
      height 18px
    & input
      background transparent
      border none
</style>
