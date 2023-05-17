<template>
  <div class="affiche__item">
    <div class="affiche__item-left">
      <div class="img">
        <a href="/filmbase/3415/"><img :src="data.poster.url" :alt="data.name" /></a>
      </div>
    </div>
    <div class="affiche__item-right">
      <div class="film-title">
        <nuxt-link :to="`/movies/${data.id}`">{{ data.name }}</nuxt-link>
      </div>
      <div class="film-links">
        <b-tabs :tabs="tabs"></b-tabs>
        <!-- <span href="/filmbase/3415/comments/#content" class="button">Отзывы (3)</span> -->
      </div>
      <div class="film-short">
        <div v-if="data.ageRating" class="item mpaa">Возраст: {{ data.ageRating }}+</div>
        <div class="item year">Год: {{ data.year }}</div>
        <div class="item duration">Длительность: {{ formattedDate }}</div>
        <div class="item country">
          {{ declOfNumCountry }}:
          <span> {{ formattedCountry }}</span>
        </div>
      </div>
      <div class="film-table">
        <div class="film-table__item">
          <div class="film-table__name">Оценка</div>
          <div class="film-table__info"></div>
        </div>
        <div class="film-table__item">
          <div class="film-table__name">Жанр</div>
          <div class="film-table__info">{{ formattedGenre }}</div>
        </div>
      </div>
      <div class="story">{{ data.description }}</div>
    </div>
  </div>
</template>

<script>
import formatDate from '~/utils/formatDate';
import declOfNum from '~/utils/declOfNum';
import convertToString from '~/utils/convertToString';
import BTabs from '~/components/atoms/BTabs/BTabs';

export default {
  name: 'BAfficheItem',
  components: {
    BTabs,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tabs: [
        { id: 1, name: 'Описание фильма' },
        { id: 2, name: 'Дополнительно' },
      ],
    };
  },

  computed: {
    formattedDate() {
      return formatDate(this.data.movieLength);
    },
    formattedCountry() {
      return convertToString(this.data.countries);
    },
    formattedGenre() {
      return convertToString(this.data.genres);
    },
    declOfNumCountry() {
      return declOfNum(this.data.countries.length, ['Страна', 'Страны', 'Страны']);
    },
  },

  mounted() {
    console.log(this.data.countries);
  },

  methods: {},
};
</script>

<style lang="stylus" scoped>
.affiche
  &__item
    width 100%
    display flex
    align-items flex-start
    justify-content flex-start
    border-radius 4px
    background-color transparent
    padding 0
    margin 25px 0 64px
    &-left
      width 224px
      flex-shrink 0
      flex-grow 0
      margin 0 40px 0 0
      & .img
        position relative
        & img
          border-radius 4px
          objectFit(100%, contain)
    &-right
      max-width 900px
      & .film
        &-title
          fontSzLh(46,38)
          color: $white;
          margin: 0;
          transition(all)
          +hover()
            transition(all)
            text-decoration underline
        &-links
          margin-top 30px
        &-short
          display flex
          justify-content space-between
          align-items center
          margin 20px 0 40px
          & .item
            font-size 16px
            font-weight 400
            line-height 1
            color $white
            position relative
            &.country
              display flex
              gap 6px
  .film-table
    &__item
      display flex
      padding 24px 0
      align-items center
      border-bottom 1px solid $border
    &__name
      width 100%
      max-width 220px
  .story
    margin-top 32px
</style>
