<template>
  <div class="news-list" :class="classList">
    <client-only>
      <swiper ref="swiper" :options="swiper" :auto-destroy="false" class="swiper">
        <swiper-slide v-for="item in data" :key="item.id" class="swiper__slide">
          <b-news-item :data="item" />
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import additionalClassCSS from '~/utils/additionalClassCSS';
import BNewsItem from '~/components/atoms/BNewsItem/BNewsItem';

export default {
  name: 'BNewsBlock',
  components: {
    BNewsItem,
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
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiper: {
        speed: 700,
        loop: true,
        slidesPerView: 4,
        spaceBetween: 4,
        on: {
          setTranslate: () => {
            /* Hack for recalculating slider width with negative margins */
            const swiper = this.$refs.swiper;
            if (swiper && swiper.$swiper && !swiper.$swiper.isLocked) {
              const { snapGrid, slidesGrid } = swiper.$swiper;
              if (snapGrid !== slidesGrid) {
                swiper.$swiper.slidesGrid = swiper.$swiper.snapGrid;
              }
            }
          },
        },
      },
    };
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
.swiper
  &__slide
    width 520px
</style>
