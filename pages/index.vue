<template>
  <div class="main">
    <b-poster-slider :data="posters" />
    <div class="container-mini">
      <b-tabs class="tabs" :tabs="tabs" @change="switchCard" />
    </div>
    <masonry :cols="{ default: 6, 1400: 3, 1023: 2, 768: 1 }" :gutter="{ default: '2px' }">
      <b-card v-for="item in cards" :key="item.id" :data="item" :type="currentTab" />
    </masonry>
    <b-news-block :data="newsList" class="news-list" />
  </div>
</template>

<script>
import BPosterSlider from '~/components/atoms/BPosterSlider/BPosterSlider';
import BCard from '~/components/atoms/BCard/BCard';
import BTabs from '~/components/atoms/BTabs/BTabs';
import BNewsBlock from '~/components/molecules/BNewsBlock/BNewsBlock';

export default {
  name: 'IndexPage',
  components: {
    BPosterSlider,
    BCard,
    BTabs,
    BNewsBlock,
  },
  async asyncData({ store, route }) {
    const page = await store.dispatch('general/getGeneralPage');
    const cards = await store.dispatch('cards/getCardsPage');
    const news = await store.dispatch('news/getNews');
    return {
      posters: page.posters,
      cardList: {
        today: cards.today.list,
        soon: cards.soon.list,
      },
      tabs: cards.tabs,
      newsList: news,
    };
  },
  data() {
    return {
      currentTab: 'today',
    };
  },
  computed: {
    cards() {
      return this.cardList[this.currentTab];
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
  & .news-list
    margin-top 48px
</style>
