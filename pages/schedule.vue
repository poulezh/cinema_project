<template>
  <div class="contacts">schedule</div>
</template>

<script>
export default {
  name: 'SchedulePage',
  components: {},
  async asyncData({ store }) {
    await store.dispatch('ui/setNewsProps', {
      newsShow: false,
    });
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="stylus" scoped></style>
