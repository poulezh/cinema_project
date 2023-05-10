<template>
  <div class="new-item">
    <div>
      news
      <!-- <h2>{{ news.title }}</h2> -->
      <!-- <p>{{ news.text }}</p> -->
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
  asyncData({ params, $axios }) {
    console.log(params);
    // const { data } = await $axios.get(`/http://localhost:3001/news/`);
    return {
      news: params,
    };
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped></style>
