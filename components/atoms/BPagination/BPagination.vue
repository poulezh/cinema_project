<template>
  <div v-if="page.length > 10" class="pagination">
    <button :class="{ _disable: isPrevPageDisabled }" @click="prevPage">Предыдущая страница</button>
    <button :class="{ _disable: isNextPageDisabled }" @click="nextPage">Следующая страница</button>
  </div>
</template>

<script>
import additionalClassCSS from '~/utils/additionalClassCSS';

export default {
  name: 'BPagination',
  props: {
    page: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    modClass() {
      return additionalClassCSS(this.mod);
    },
    classList() {
      return Object.assign({}, this.modClass, this.errorClass);
    },
    isPrevPageDisabled() {
      return this.currentPage === 1;
    },
    isNextPageDisabled() {
      const lastPage = Math.ceil(this.page.length / 10);
      return this.currentPage === lastPage;
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    nextPage() {
      const lastPage = Math.ceil(this.page.length / 10);
      if (this.currentPage < lastPage) {
        this.$emit('update:currentPage', this.currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.pagination
  display flex
  justify-content center
  margin-top 20px
  padding-bottom 24px
  & button
    margin 0 10px;
    transition(all)
    +hover()
      transition(all)
      text-decoration underline
    &._disable
      opacity 0.5
      cursor default
      pointer-events none
</style>
