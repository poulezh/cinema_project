<template>
  <div class="new-item container-mini">
    <h1 class="new-item__title">{{ movies.name }}</h1>
    <div class="new-item__text" v-html="movies.description"></div>
  </div>
</template>

<script>
export default {
  name: 'BNewsItem',
  components: {},
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

<style lang="stylus" scoped></style>
