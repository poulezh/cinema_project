<template>
  <div class="admin container-mini">
    <BForm />
  </div>
</template>

<script>
import BForm from '~/components/atoms/BForm/BForm';

export default {
  name: 'BAdminPage',
  components: {
    BForm,
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
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped></style>
