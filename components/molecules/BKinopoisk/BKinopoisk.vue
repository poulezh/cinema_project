<template>
  <div class="kinopoisk">
    <h1>Форма добавления фильма</h1>
    <form class="form" @submit.prevent="fetchMovieData">
      <div class="form__input">
        <label>
          <input class="input" type="text" v-model="nameMovie" placeholder="Название фильма" />
        </label>
      </div>
      <b-button type="submit">Сохранить</b-button>
    </form>
    <b-movie-list :data="moviesList" @open-modal="openPopup" @movie-deleted="fetchMoviesList" />
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
// import BInput from '~/components/atoms/BInput/BInput';
import BButton from '~/components/atoms/BButton/BButton';

export default {
  name: 'BKinopoisk',
  components: {
    BFormPopup,
    BMovieList,
    // BInput,
    BButton,
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

        console.log('searchResponse', searchResponse.data.docs[0]);

        this.movieId = searchResponse.data.docs[0].id;

        const movieUrl = `https://api.kinopoisk.dev/v1.3/movie/${this.movieId}`;
        const movieResponse = await axios.get(movieUrl, {
          headers: {
            'X-API-KEY': apiKey,
            Accept: 'application/json',
          },
        });

        console.log('movieResponse', movieResponse.data);

        const movieData = movieResponse.data;

        const actors = getPersonsByProfession(movieData.persons, 'actor', 6);
        const composers = getPersonsByProfession(movieData.persons, 'composer', 1);
        const produsers = getPersonsByProfession(movieData.persons, 'produser', 1);
        const directors = getPersonsByProfession(movieData.persons, 'director', 1);

        const personsList = [];
        personsList.push(actors);
        personsList.push(composers);
        personsList.push(produsers);
        personsList.push(directors);

        const dbData = {
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
        this.nameMovie = '';
        this.fetchMoviesList();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.kinopoisk
  width 100%
  height 100%
  background-color: rgba(0, 0, 0, 0.5);
  padding 32px
.popup
  width 100vw
  height 100vh
  position fixed
  left 0
  top 0
  &:after
    content ''
    position absolute
    background $orange
    left 0
    top 0
    right 0
    bottom 0
    z-index 8
    opacity .5
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
  &__close
    padding 12px
    position absolute
    right 12px
    top 12px
    +hover()
      cursor pointer
      color $orange
.form
  &__input
    width 300px
    margin-bottom 32px
  & .input
    width 100%
    // border 2px solid $white
    border none
    border-radius 48px
    color $white
    fontSzLh(16, 26)
    font-weight 500
    text-transform uppercase
    height 48px
    padding 0 24px
    outline none
    background $dark
    transition(all)
    &:focus
      border-color $white
    +hover()
      &::placeholder
        color rgba($white, 1)
        transition(all)
    &::placeholder
      color rgba($white, 0.5)
      transition(all)
</style>
