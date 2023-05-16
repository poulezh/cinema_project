<template>
  <div class="admin container-mini">
    <BKinopoisk :tabs="tabs" />
  </div>
</template>

<script>
import BKinopoisk from '~/components/atoms/BKinopoisk/BKinopoisk';

export default {
  name: 'BAdminPage',
  components: {
    BKinopoisk,
  },
  layout: 'admin',
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
    await store.dispatch('ui/setNewsProps', {
      newsShow: false,
    });
    const tabsList = await store.dispatch('cards/getCardsPage');
    return {
      tabs: tabsList,
    };
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped></style>
