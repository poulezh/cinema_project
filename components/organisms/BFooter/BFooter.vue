<template>
  <div class="footer__wrap">
    <b-news-block :data="newsList" class="news-list" />
    <div class="footer"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BNewsBlock from '~/components/molecules/BNewsBlock/BNewsBlock';

export default {
  name: 'BFooter',
  components: {
    BNewsBlock,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('news', {
      newsList: ({ news }) => news,
    }),
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      await this.$store.dispatch('news/getNews');
    },
  },
};
</script>

<style lang="stylus" scoped>
.news-list
    margin-top 48px
.footer
  display flex
  flex-direction column
  align-items center
  justify-content center
  background-image url('~/static/svg/footer.svg')
  background-position bottom
  background-repeat no-repeat
  background-size auto
  width 100%
  height 548px
</style>
