<template>
  <div class="new-item" :class="classList">
    <nuxt-link :to="data.url" class="new-item__wrap">
      <div class="new-item__image">
        <img :src="data.src" alt="" />
      </div>
      <div class="new-item__info">
        <div class="new-item__info-date">{{ data.date }}</div>
        <div class="new-item__info-title">{{ data.title }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import additionalClassCSS from '~/utils/additionalClassCSS';

export default {
  name: 'BNewsItem',
  props: {
    mod: {
      type: [Array, String],
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    modClass() {
      return additionalClassCSS(this.mod);
    },
    disableClass() {
      return additionalClassCSS(this.disable ? 'disable' : '');
    },
    classList() {
      return Object.assign({}, this.modClass, this.disableClass, this.errorClass);
    },
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.new-item
  position relative
  width 100%
  background $dark
  border-radius 4px
  padding 40px 32px
  &__wrap
    display flex
    gap 32px
  &__image
    width 100px
    height 100px
    border-radius 12px
    overflow hidden
    & img
      objectFit(100%, cover)
  &__info
    &-date
      fontSzLh(14,24)
      color: $grey;
      margin: 0 0 8px;
    &-title
      fontSzLh(18,26)
      color $white
</style>
