<template>
  <div class="work-area">
    <div class="title">Афиша</div>
    <div class="tab-page">
      <b-tabs :tabs="tabsPage" mod="affiche" @change="switchMovies" />
    </div>
    <div class="affiche">
      <div class="affiche__content">
        <div v-for="item in movies" :key="item.id" class="affiche__wrap">
          <BAfficheItem :data="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BAfficheItem from '~/components/organisms/BAfficheItem/BAfficheItem';
import BTabs from '~/components/atoms/BTabs/BTabs';

export default {
  name: 'AffichePage',
  components: {
    BAfficheItem,
    BTabs,
  },
  async asyncData({ store }) {
    store.dispatch('ui/setNewsProps', {
      newsShow: true,
    });
    const page = await store.dispatch('affiche/getAffichePage');
    console.log(page);
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
    };
  },
  computed: {
    movies() {
      return [...this.page].reverse();
    },
  },
  methods: {
    switchMovies(tab) {
      console.log(tab);
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
  & .title
    font-size 36px
    line-height 40px
    text-align center
    padding 40px 0 30px
    margin 0
  & .tab-page
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    background: #222222;
    border-radius: 12px 12px 0 0;
    overflow hidden
.affiche
  position: relative;
  padding: 1px 40px 1px;
  background-color: $anthracite;
  border-radius: 12px;
  margin: 0;
  &__content
    border-radius: 0 0 4px 4px
    padding 12px 0 24px
</style>
