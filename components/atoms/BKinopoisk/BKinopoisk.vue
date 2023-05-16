<template>
  <div>
    <h1>Форма добавления фильма</h1>
    <form @submit.prevent="fetchMovieData">
      <label>
        Введи ID фильма :
        <input type="text" v-model="movieId" />
      </label>
      <button type="submit">Сохранить</button>
    </form>
    <h3>Фильмы id который уже есть</h3>
    <ul>
      <li v-for="movie in moviesList" :key="movie.id">
        <span class="movie" @click="openPopup(movie)">{{ movie.name }} (ID: {{ movie.id }})</span>
        <span @click="deleteMovie(movie.id)">x</span>
      </li>
    </ul>
    <div v-if="popup" class="popup">
      <div class="popup__content">
        <b-form :data="popupContent" :tabs="tabs" @close-modal="popup = false" />
        <span class="popup__close" @click="popup = false">X</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import BForm from '~/components/atoms/BForm/BForm';
// import BTabs from '~/components/atoms/BTabs/BTabs';
// import BSelect from '~/components/atoms/BSelect/BSelect';
// import BButton from '~/components/atoms/BButton/BButton';

export default {
  name: 'BKinopoisk',
  components: {
    BForm,
    // BTabs,
    // BButton,
    // BSelect,
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
      movieData: null,
      posterDataUrl: null,
      moviesList: [],
      popup: false,
      popupContent: [],
    };
  },
  computed: {
    // availableTimes() {
    //   const sessionTimes = [];
    //   const movieLength = this.movieLength;
    //   const breakTime = 15;
    //   const startHour = Math.floor(this.startTime / 60);
    //   const endHour = Math.floor(this.endTime / 60);

    //   for (let hour = startHour; hour <= endHour; hour++) {
    //     for (let minute = 0; minute <= 60 - movieLength - breakTime; minute += movieLength + breakTime) {
    //       const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    //       sessionTimes.push(time);
    //     }
    //   }

    //   return sessionTimes;
    // },
    movieName() {
      if (this.movieData) {
        return this.movieData.name;
      } else {
        return '';
      }
    },
  },
  async mounted() {
    await this.fetchMoviesList();
  },
  methods: {
    openPopup(item) {
      this.popup = !this.popup;
      this.popupContent = item;
    },
    async deleteMovie(movieId) {
      try {
        await axios.delete(`http://localhost:3001/movies/${movieId}`);
        await this.fetchMoviesList();
      } catch (error) {
        console.error(error);
      }
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
      const apiKey = '29Q3S0H-N6VM2K4-M50XC7W-JCYEWWG';
      const apiUrl = `https://api.kinopoisk.dev/v1.3/movie/${this.movieId}`;
      // const apiUrl = `https://api.kinopoisk.dev/v1.3/movie/search?page=1&limit=10&query=${this.movieId}`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'X-API-KEY': apiKey,
            Accept: 'application/json',
          },
        });

        const movieData = response.data;
        const posterUrl = movieData.poster.url;

        const posterBlob = await this.loadImageAsBlob(posterUrl);
        const posterDataUrl = await this.createDataUrlFromFile(posterBlob);

        localStorage.setItem(`poster-${this.movieId}`, posterDataUrl);

        const actors = movieData.persons
          .filter((person) => person.enProfession === 'actor')
          .slice(0, 6)
          .map((person) => ({ id: person.id, photo: person.photo, name: person.name }));

        const composers = movieData.persons
          .filter((person) => person.enProfession === 'composer')
          .slice(0, 1)
          .map((person) => ({ id: person.id, photo: person.photo, name: person.name }));

        const produser = movieData.persons
          .filter((person) => person.enProfession === 'produser')
          .slice(0, 1)
          .map((person) => ({ id: person.id, photo: person.photo, name: person.name }));

        const director = movieData.persons
          .filter((person) => person.enProfession === 'director')
          .slice(0, 1)
          .map((person) => ({ id: person.id, photo: person.photo, name: person.name }));

        const personsList = [];
        personsList.push(actors);
        personsList.push(composers);
        personsList.push(produser);
        personsList.push(director);

        const dbData = {
          id: this.movieId,
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

        this.movieData = movieData;
        this.posterDataUrl = posterDataUrl;
        this.movieId = '';
        this.fetchMoviesList();
      } catch (error) {
        console.error(error);
      }
    },
    async loadImageAsBlob(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      return blob;
    },
    async createDataUrlFromFile(file) {
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
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
