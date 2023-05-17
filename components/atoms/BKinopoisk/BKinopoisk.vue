<template>
  <div>
    <h1>Форма добавления фильма</h1>
    <form @submit.prevent="fetchMovieData">
      <label>
        Введи ID фильма :
        <input type="text" v-model="nameMovie" />
      </label>
      <button type="submit">Сохранить</button>
    </form>
    <b-movie-list :data="moviesList" @open-modal="openPopup" />
    <div v-if="popup" class="popup">
      <div class="popup__content">
        <b-form-popup :data="popupContent" :tabs="tabs" @close-modal="popup = false" />
        <span class="popup__close" @click="popup = false">X</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import getPersonsByProfession from '~/utils/getPersonsByProfession';
import BFormPopup from '~/components/atoms/BFormPopup/BFormPopup';
import BMovieList from '~/components/atoms/BMovieList/BMovieList';

export default {
  name: 'BKinopoisk',
  components: {
    BFormPopup,
    BMovieList,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      movieId: '',
      nameMovie: '',
      movieData: null,
      moviesList: [],
      popup: false,
      popupContent: [],
    };
  },
  computed: {},
  async mounted() {
    await this.fetchMoviesList();
  },
  methods: {
    openPopup(item) {
      this.popup = !this.popup;
      this.popupContent = item;
    },
    async fetchMoviesList() {
      try {
        const response = await axios.get('http://localhost:3001/movies');
        const moviesList = response.data.map((movie) => {
          return movie;
        });
        this.moviesList = moviesList;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchMovieData() {
      const apiKey = this.$config.kinopoiskToken;
      const searchUrl = `https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=1&query=${this.nameMovie}`;

      try {
        const searchResponse = await axios.get(searchUrl, {
          headers: {
            'X-API-KEY': apiKey,
            Accept: 'application/json',
          },
        });

        this.movieId = searchResponse.data.docs[0].id;

        const movieUrl = `https://api.kinopoisk.dev/v1.3/movie/${this.movieId}`;
        const movieResponse = await axios.get(movieUrl, {
          headers: {
            'X-API-KEY': apiKey,
            Accept: 'application/json',
          },
        });

        const movieData = movieResponse.data;

        const actors = getPersonsByProfession(movieData.persons, 'actor', 6);
        const composers = getPersonsByProfession(movieData.persons, 'composer', 1);
        const produsers = getPersonsByProfession(movieData.persons, 'produser', 1);
        const directors = getPersonsByProfession(movieData.persons, 'director', 1);

        const personsList = [...actors, ...composers, ...produsers, ...directors];

        const dbData = {
          // id: this.movieId,
          id: movieData.id,
          name: movieData.name,
          ageRating: movieData.ageRating,
          countries: movieData.countries,
          description: movieData.description,
          movieLength: movieData.movieLength,
          budget: movieData.budget,
          genres: movieData.genres,
          persons: personsList,
          premiere: movieData.premiere,
          rating: movieData.rating,
          year: movieData.year,
          videos: movieData.videos,
          votes: movieData.votes,
          poster: movieData.poster,
        };
        await axios.post('http://localhost:3001/movies', dbData);

        // this.movieData = movieData;
        this.movieId = '';
        this.fetchMoviesList();
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
.popup
  width 100vw
  height 100vh
  position fixed
  left 0
  top 0
  &:after
    content ''
    position absolute
    background $red
    left 0
    top 0
    right 0
    bottom 0
    z-index 8
    opacity .5
  & h3
    margin-bottom 24px
  &__content
    max-width 1280px
    width 100%
    max-height 880px
    height 100%
    background $dark
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 9
    display flex
    justify-content space-between
    & .form
      display flex
      flex-direction column
      gap 32px
      padding 32px
  &__close
    padding 12px
    position absolute
    right 12px
    top 12px
    +hover()
      cursor pointer
      color $red
  &__time
    display flex
</style>
