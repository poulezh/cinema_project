<template>
  <div class="movie-list">
    <h3>Фильмы id который уже есть</h3>
    <ul>
      <li v-for="movie in data" :key="movie.id">
        <span class="movie" @click="openPopup(movie)">{{ movie.name }} (ID: {{ movie.id }})</span>
        <span @click="deleteMovie(movie.id)">x</span>
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
        await this.fetchMoviesList();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
li
  +hover()
    .movie
      color $red
      cursor pointer
</style>
