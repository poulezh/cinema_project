<template>
  <div class="work-area">
    <b-affiche-item :data="movies" type="movie" mod="movie" />
  </div>
</template>

<script>
import BAfficheItem from '~/components/organisms/BAfficheItem/BAfficheItem';

export default {
  name: 'BNewsItem',
  components: {
    BAfficheItem,
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
      type: Object,
      default: () => {},
    },
  },
  async asyncData({ store, params }) {
    store.dispatch('ui/setNewsProps', {
      newsShow: true,
    });
    const id = params.id;
    await store.dispatch('movies/getMovies', id);
    return { movies: store.state.movies.movies };
  },
  data() {
    return {};
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
