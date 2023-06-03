<template>
  <div class="main">
    <b-poster-slider :data="posters" />
    <div class="container-mini">
      <b-tabs class="tabs" :tabs="tabs" @change="switchCard" />
    </div>
    <!-- <div class="card__wrap">
      <b-card v-for="item in cardsWithPlaceholders" :key="item.id" :data="item" :type="currentTab" />
    </div> -->
    <client-only>
      <masonry :cols="{ default: 6, 1680: 5, 1380: 4, 1180: 3, 1024: 2, 768: 1 }" :gutter="{ default: '2px' }">
        <b-card v-for="item in cardsWithPlaceholders" :key="item.id" :data="item" :type="currentTab" />
      </masonry>
    </client-only>
    <b-no-films v-if="cards.length < 1" />
    <TC />
  </div>
</template>

<script>
import axios from 'axios';
import BPosterSlider from '~/components/atoms/BPosterSlider/BPosterSlider';
import BCard from '~/components/molecules/BCard/BCard';
import BTabs from '~/components/atoms/BTabs/BTabs';
import TC from '~/components/atoms/TC/TC';
import BNoFilms from '~/components/atoms/BNoFilms/BNoFilms';

export default {
  name: 'IndexPage',
  components: {
    BPosterSlider,
    BCard,
    BTabs,
    TC,
    BNoFilms,
  },
  async asyncData({ store, route }) {
    store.dispatch('ui/setNewsProps', {
      newsShow: true,
    });
    const page = await store.dispatch('general/getGeneralPage');
    const cards = await store.dispatch('cards/getCardsPage');
    const todayList = await store.dispatch('films/getTodayMovie');
    const soonList = await store.dispatch('films/getSoonMovie');
    return {
      posters: page.posters,
      cardList: {
        today: todayList,
        soon: soonList,
      },
      tabs: cards,
    };
  },
  data() {
    return {
      currentTab: 'today',
    };
  },
  computed: {
    cards() {
      const movies = [...this.cardList[this.currentTab]].reverse();
      return movies;
    },
    cardsWithPlaceholders() {
      if (this.cards.length === 0) {
        return [];
      }
      const cards = [...this.cards];
      const placeholderCount = 6 - (cards.length % 6);
      for (let i = 0; i < placeholderCount; i++) {
        cards.push({
          mod: 'placeholder',
        });
      }
      return cards;
    },
  },
  async created() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/movies');
      const movies = response.data;
      console.log('movies', movies);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    switchCard(item) {
      this.currentTab = item.tab;
    },
  },
};
</script>

<style lang="stylus">
.main
  & .tabs
    margin 12px 0
  .card__wrap
    // display flex
</style>
