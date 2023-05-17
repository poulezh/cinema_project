<template>
  <form class="form" @submit.prevent="addMovie(data)">
    <div class="form__tabs">
      <h3>ФИЛЬМ: {{ data.name }}</h3>
      <h3>ДЛИТЕЛЬНОСТЬ: {{ formattedDate }}</h3>
      <BTabs :tabs="tabs" @change="switchTabs" />
    </div>
    <div class="form__time">
      <label>
        Дата начала показа:
        <client-only><date-picker v-model="dateStart" :value="dateStart" placeholder="DD/MM/YYYY"></date-picker></client-only>
      </label>

      <label>
        Дата окончания показа:
        <client-only><date-picker v-model="dateEnd" placeholder="DD/MM/YYYY"></date-picker></client-only>
      </label>
    </div>
    <div class="form__halls">
      <h3>Выберите зал:</h3>
      <b-select :options="availableHalls" label="Выберите зал:" @change="removeTime" />
    </div>
    <div class="popup_seanses">
      <!-- <h3>Выберите время:</h3> -->
      <b-select :options="availableTimes" label="Выберите время:" @change="removeTime" />
      <div v-for="(time, index) in selectedTimes" :key="index">
        {{ time }}
      </div>
    </div>
    <b-button type="submit">{{ sendText }}</b-button>
    <div v-if="error">{{ errorText }}</div>
  </form>
</template>

<script>
import axios from 'axios';
import formatDate from '~/utils/formatDate';
import BTabs from '~/components/atoms/BTabs/BTabs';
import BSelect from '~/components/atoms/BSelect/BSelect';
import BButton from '~/components/atoms/BButton/BButton';

export default {
  name: 'BFormPopup',
  components: {
    BTabs,
    BButton,
    BSelect,
  },
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      watchValue: 'today',
      dateEnd: '',
      dateStart: '',
      sendText: 'Отправить',
      error: false,
      errorText: 'Этот фильм уже есть, выбери другой формат или фильм',
      sessionTimes: [],
      movieLength: 106,
      selectedTimes: [],
      availableHalls: ['Зал 1', 'Зал 2', 'Зал 3', 'Зал 4'],
      availableTimes: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      startTime: 480,
      endTime: 1380,
    };
  },
  computed: {
    formattedDate() {
      return formatDate(this.data.movieLength);
    },
  },
  mounted() {
    console.log(this.data);
  },
  methods: {
    setTime(timeObj) {
      this.selectedTimes.push(timeObj);
    },
    removeTime(time) {
      const index = this.availableTimes.indexOf(time);
      if (index !== -1) {
        this.availableTimes.splice(index, 1);
      }
      this.setTime(time);
    },
    switchTabs(item) {
      this.error = false;
      this.watchValue = item.tab;
    },
    async addMovie(movie) {
      try {
        movie.dateStart = this.dateStart;
        movie.dateEnd = this.dateEnd;
        await axios.post(`http://localhost:3001/${this.watchValue}`, movie);
        this.sendText = 'Отправлено!';
        this.dateStart = '';
        this.dateEnd = '';
        this.$emit('close-modal');
      } catch (error) {
        this.error = true;
        console.error(error);
      }
    },
  },
};
</script>

<style lang="stylus">
.vdp-datepicker
  width auto
  &__calendar
    background $dark !important
  input
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
.vdp-datepicker__calendar header .prev:not(.disabled):hover, .vdp-datepicker__calendar header .next:not(.disabled):hover, .vdp-datepicker__calendar header .up:not(.disabled):hover
  background $dark !important
</style>

<style lang="stylus" scoped>
.form
  display flex
  flex-direction column
  gap 32px
  padding 32px
  & h3
    margin-bottom 24px
  &__time
    display flex
</style>
