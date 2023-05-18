<template>
  <div class="affiche__item" :class="classList">
    <div class="affiche__item-left">
      <div class="img">
        <nuxt-link :to="`/movies/${data.id}/`"><img :src="data.poster.url" :alt="data.name" /></nuxt-link>
      </div>
    </div>
    <div class="affiche__item-right">
      <div class="film-title">
        <nuxt-link :to="`/movies/${data.id}`">{{ data.name }}</nuxt-link>
      </div>
      <div class="film-links">
        <b-tabs :tabs="tabs" @change="switchTabs"></b-tabs>
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
        <template v-if="additionally">
          <div v-if="data.budget.value" class="film-table__item">
            <div class="film-table__name">Бюджет</div>
            <div class="film-table__info">{{ formattedValue }}</div>
          </div>
          <div v-if="data.persons[3].length > 0" class="film-table__item">
            <div class="film-table__name">Режисер</div>
            <div class="film-table__info">{{ formattedDirectors }}</div>
          </div>
          <div v-if="data.persons[0].length > 0" class="film-table__item">
            <div class="film-table__name">Актеры</div>
            <div class="film-table__info">{{ formattedActors }}</div>
          </div>
          <div v-if="data.persons[2].length > 0" class="film-table__item">
            <div class="film-table__name">Продюсеры</div>
            <div class="film-table__info">{{ formattedProdusers }}</div>
          </div>
          <div v-if="data.persons[1].length > 0" class="film-table__item">
            <div class="film-table__name">Композиторы</div>
            <div class="film-table__info">{{ formattedComposers }}</div>
          </div>
        </template>
      </div>
      <div class="story">{{ data.description }}</div>
      <div class="trailer">
        <iframe controls="0" :src="data.videos.trailers[0].url" frameborder="0" class="video" />
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from '~/utils/formatDate';
import declOfNum from '~/utils/declOfNum';
import additionalClassCSS from '~/utils/additionalClassCSS';
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
    type: {
      type: String,
      default: '',
    },
    mod: {
      type: [Array, String],
      default: '',
    },
  },
  data() {
    return {
      tabs: [
        { id: 1, name: 'Описание фильма' },
        { id: 2, name: 'Дополнительно' },
      ],
      additionally: false,
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
    formattedActors() {
      return convertToString(this.data.persons[0]);
    },
    formattedComposers() {
      return convertToString(this.data.persons[1]);
    },
    formattedProdusers() {
      return convertToString(this.data.persons[2]);
    },
    formattedDirectors() {
      return convertToString(this.data.persons[3]);
    },
    formattedValue() {
      let value = this.data.budget.value;
      const currency = this.data.budget.currency;

      if (value >= 1000000) {
        value = (value / 1000000).toFixed() + ' млн';
      }

      return value + ' ' + currency;
    },
    declOfNumCountry() {
      return declOfNum(this.data.countries.length, ['Страна', 'Страны', 'Страны']);
    },
    modClass() {
      return additionalClassCSS(this.mod);
    },
    disableClass() {
      return additionalClassCSS(this.disable ? 'disable' : '');
    },
    errorClass() {
      return additionalClassCSS(this.error, 'error');
    },
    classList() {
      return Object.assign({}, this.modClass, this.disableClass, this.errorClass);
    },
  },

  mounted() {
    // console.log(this.data);
  },

  methods: {
    switchTabs(tab) {
      this.additionally = !this.additionally;
    },
  },
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
    &._movie
      & .trailer
        display block
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
.film
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
    margin 20px 0 20px
    & .item
      font-size 16px
      font-weight 400
      line-height 1
      color $white
      position relative
      &.country
        display flex
        gap 6px
  &-table
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
.trailer
  width 100%
  height 400px
  display none
  margin-top 32px
  & .video
    width 100%
    height 100%
</style>
