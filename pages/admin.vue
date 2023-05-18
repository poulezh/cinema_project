<template>
  <div class="admin container-mini">
    <BKinopoisk :tabs="tabs" />
  </div>
</template>

<script>
import axios from 'axios';
import BKinopoisk from '~/components/molecules/BKinopoisk/BKinopoisk';
// import BInput from '~/components/atoms/BInput/BInput';

export default {
  name: 'BAdminPage',
  components: {
    BKinopoisk,
    // BInput,
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
  methods: {
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('image', new Blob([file], { type: file.type }), file.name);
      const response = await axios.post('http://localhost:3001/movies/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
