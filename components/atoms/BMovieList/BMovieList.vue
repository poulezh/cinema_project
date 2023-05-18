<template>
  <div class="movie-list">
    <h3>
      Фильмы id которыx уже есть <br />
      можно добавить в расписание
    </h3>
    <ul>
      <li v-for="movie in data" :key="movie.id">
        <span class="movie" @click="openPopup(movie)">{{ movie.name }} (ID: {{ movie.id }})</span>
        <span @click="deleteMovie(movie.id)"><svg-icon name="close" /></span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BMovieList',
  components: {},
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    openPopup(item) {
      this.$emit('open-modal', item);
    },
    async deleteMovie(movieId) {
      try {
        await axios.delete(`http://localhost:3001/movies/${movieId}`);
        this.$emit('movie-deleted');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.movie-list
  margin-top 32px
  display flex
  flex-direction column
  gap 24px
  & li
    padding 6px 0
    width fit-content
    display flex
    align-items center
    justify-content space-between
    gap 24px
    width 200px
    +hover()
      .movie
        color $orange
        cursor pointer
  & svg
    width 24px
    height 24px
    fill $white
    +hover()
      fill $orange
</style>
