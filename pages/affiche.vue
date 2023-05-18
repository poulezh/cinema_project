<template>
  <div class="work-area">
    <b-top-page :tabs="tabsPage" />
    <div class="affiche">
      <div class="affiche__content">
        <b-affiche-item v-for="item in movies" :key="item.id" :data="item" />
      </div>
      <b-pagination :page="page" :current-page.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import BAfficheItem from '~/components/organisms/BAfficheItem/BAfficheItem';
import BTopPage from '~/components/molecules/BTopPage/BTopPage';
import BPagination from '~/components/atoms/BPagination/BPagination';

export default {
  name: 'AffichePage',
  components: {
    BAfficheItem,
    BTopPage,
    BPagination,
  },
  async asyncData({ store }) {
    store.dispatch('ui/setNewsProps', {
      newsShow: true,
    });
    const page = await store.dispatch('affiche/getAffichePage');
    return {
      page,
    };
  },
  data() {
    return {
      tabs: [
        { id: 1, name: 'Описание фильма' },
        { id: 2, name: 'Дополнительно' },
      ],
      tabsPage: [
        { id: 1, name: 'Сегодня' },
        { id: 2, name: 'Фильмы мая' },
        { id: 3, name: 'Архив' },
      ],
      additionally: false,
      description: false,
      currentPage: 1,
    };
  },
  computed: {
    movies() {
      const movies = [...this.page].reverse();
      const startIndex = (this.currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      return movies.slice(startIndex, endIndex);
    },
  },
  methods: {
    switchMovies(tab) {
      // console.log(tab);
    },
  },
};
</script>

<style lang="stylus" scoped>
.work-area
  max-width 1560px
  width 100%
  box-sizing border-box
  margin 0 auto
.affiche
  position: relative;
  padding: 1px 40px 1px;
  background-color: $anthracite;
  border-radius: 0 0 12px 12px;
  margin: 0;
  &__content
    border-radius: 0 0 4px 4px
    padding 12px 0 24px
</style>
