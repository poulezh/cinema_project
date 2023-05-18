<template>
  <div class="main">
    <b-poster-slider :data="posters" />
    <div class="container-mini">
      <b-tabs class="tabs" :tabs="tabs" @change="switchCard" />
    </div>
    <masonry :cols="{ default: 6, 1023: 4, 768: 2 }" :gutter="{ default: '2px' }">
      <b-card v-for="item in cardsWithPlaceholders" :key="item.id" :data="item" :type="currentTab" />
    </masonry>
    <b-no-films v-if="cards.length < 1" />
  </div>
</template>

<script>
import BPosterSlider from '~/components/atoms/BPosterSlider/BPosterSlider';
import BCard from '~/components/molecules/BCard/BCard';
import BTabs from '~/components/atoms/BTabs/BTabs';
import BNoFilms from '~/components/atoms/BNoFilms/BNoFilms';

export default {
  name: 'IndexPage',
  components: {
    BPosterSlider,
    BCard,
    BTabs,
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
</style>
