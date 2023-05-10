<template>
  <div class="poster__slider">
    <client-only>
      <swiper ref="swiper" :options="swiper" :auto-destroy="false" class="poster__swiper">
        <swiper-slide v-for="item in data" :key="item.id" class="poster__slide">
          <div class="poster__item">
            <div class="poster__image">
              <img :src="item.src" alt="" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="poster__slider-pagination"></div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'BPosterSlider',
  components: {},
  props: {
    data: {
      type: [Array, Object],
      default: () => [],
    },
  },
  data() {
    return {
      swiper: {
        slidesPerView: 'auto',
        loop: true,
        observer: true,
        observeParents: true,
        speed: 2000,
        autoplay: {
          delay: 4000,
        },
        pagination: {
          el: '.poster__slider-pagination',
          clickable: true,
          type: 'bullets',
        },
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
      // data: [
      //   { id: 1, src: '/img/poster1.jpg' },
      //   { id: 2, src: '/img/poster2.jpg' },
      //   { id: 3, src: '/img/poster1.jpg' },
      // ],
    };
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.poster
  &__slider
    height 596px
    width 100%
    overflow hidden
    position relative
    &-pagination
      position absolute
      bottom 36px
      left 50%
      transform translateY(-50%)
      z-index 3
      &:deep(.swiper-pagination-bullet)
        margin 0 14px
        opacity 1
        position relative
        &:before
          position: absolute;
          content: '';
          background-color: rgba(0, 0, 0, 0.6);
          width: 14px;
          height: 14px;
          left: calc(50% - 14px/2);
          top: calc(50% - 14px/2);
          border-radius: 50%;
        &:after
          position: absolute;
          content: '';
          width: 10px;
          height: 10px;
          left: calc(50% - 10px/2);
          top: calc(50% - 10px/2);
          border-radius: 50%;
          background-color: transparent;
          box-sizing: border-box;
          border: 1px solid #fff;
          border-radius: 50%;
      &:deep(.swiper-pagination-bullet-active)
        &:after
          background-color: $white;
</style>
