<template>
  <div class="new-item container-mini">
    <h1 class="new-item__title">{{ news.title }}</h1>
    <div class="new-item__text" v-html="news.text"></div>
    <!-- <BForm /> -->
  </div>
</template>

<script>
// import BForm from '~/components/atoms/BForm/BForm';

export default {
  name: 'BNewsItem',
  components: {
    // BForm,
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
    await store.dispatch('news/getCurrentNews', id);
    return { news: store.state.news.currentNews };
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped>
.new-item
  position relative
  height 403px
  padding-bottom 50px
  &__title
    padding 40px 0 30px
  &__text
    background-color $anthracite
    border-bottom-left-radius 12px
    border-bottom-right-radius 12px
    padding 30px 80px 55px
    fontSzLh(15,21)
    font-weight 400
  & >>> p
    margin-bottom 18px
</style>
