<template>
  <div class="main">
    <b-poster-slider :data="posters" />
    <div class="container-mini">
      <b-tabs class="tabs" :tabs="tabs" @change="switchCard" />
    </div>
    <masonry :cols="{ default: 6, 1400: 3, 1023: 2, 600: 1 }" :gutter="{ default: '2px', 2650: '2px' }" class="news__list">
      <b-card v-for="item in cards" :key="item.id" :data="item" :type="currentTab" />
    </masonry>
  </div>
</template>

<script>
import BPosterSlider from '~/components/atoms/BPosterSlider/BPosterSlider';
import BCard from '~/components/atoms/BCard/BCard';
import BTabs from '~/components/atoms/BTabs/BTabs';

export default {
  name: 'IndexPage',
  components: {
    BPosterSlider,
    BCard,
    BTabs,
  },
  async asyncData({ store, route }) {
    const page = await store.dispatch('general/getGeneralPage');
    const cards = await store.dispatch('cards/getCardsPage');
    return {
      posters: page.posters,
      cardList: {
        today: cards.today.list,
        soon: cards.soon.list,
      },
      tabs: cards.tabs,
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
</style>
