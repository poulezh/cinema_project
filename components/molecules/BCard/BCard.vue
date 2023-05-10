<template>
  <div class="card">
    <div class="card__wrap">
      <div class="card__image">
        <img :src="data.src" alt="" />
      </div>
      <div class="card__mem"></div>
      <div class="card__info">
        <div class="card__info-name">{{ data.name }}</div>
        <div v-if="type === 'today'" class="card__info-btn"><b-button mod="default" to="/schedule"> Купить Билет</b-button></div>
      </div>
    </div>
  </div>
</template>

<script>
import BButton from '~/components/atoms/BButton/BButton';

export default {
  name: 'BCard',
  components: {
    BButton,
  },
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
      type: [Object],
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.data);
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.card
  max-height 455px
  max-width 315px
  overflow hidden
  position relative
  transition(all)
  transition-delay 0.5s
  transition-duration .7s
  +hover()
    transition(all)
    & .card__info
      transition(all)
      transition-delay 0.5s
      transition-duration 0.5s
      bottom 0
  &__image
    border-radius 6px
    overflow hidden
    & img
      objectFit(100%, cover)

  &__info
    position absolute
    bottom -150px
    left 0
    right 0
    z-index 2
    background: rgba(0, 0, 0, 0.8);
    transition(all)
    &-name
      text-align: center;
      font-size: 18px;
      padding: 18px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &-btn
      width: 100%;
      text-align: center;
      padding: 16px 0 18px;
</style>
