<template>
  <div class="new-item">
    <div>
      news
      <h2>{{ news.title }}</h2>
      <p>{{ news.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BNewsItem',
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
    const id = params.id;
    await store.dispatch('news/getCurrentNews', id);
    return { news: store.state.news.currentNews };
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped></style>
