<template>
  <div class="input-wrapper" :class="classList">
    <input
      v-if="type === 'tel'"
      :id="name"
      v-phone
      :type="type"
      class="input"
      :maxlength="inpMaxLen"
      :placeholder="placeholder"
      :name="name"
      autocomplete="off"
      @input="emitInput"
    />
    <input v-else-if="type === 'input'" type="input" class="input" :placeholder="placeholder" name="name" required />
    <input v-else-if="type === 'kinopoisk'" type="text" class="input qwewqe" :placeholder="placeholder" name="name" />
    <div class="error-text">{{ errorText }}</div>
  </div>
</template>

<script>
import additionalClassCSS from '@/utils/additionalClassCSS';

export default {
  name: 'BInput',
  props: {
    mod: {
      type: [Array, String],
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: 'Данные введены неверно',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'input',
    },
  },
  data() {
    return {
      inpMaxLen: 17,
    };
  },
  computed: {
    activeClass() {
      return additionalClassCSS(this.value, 'active');
    },
    errorClass() {
      return additionalClassCSS(this.error, 'error');
    },
    modClass() {
      return additionalClassCSS(this.mod);
    },
    classList() {
      return Object.assign({}, this.modClass, this.activeClass, this.errorClass);
    },
  },
  methods: {
    emitInput(evt) {
      this.$emit('input', evt.target.value);
    },
  },
};
</script>

<style lang="stylus" scoped>
.input-wrapper
  &._error
    .input
      border-color $orange
      color $orange
  &._true
    .error-text
      display block
    .input
      border-color $orange
      color $orange
.input
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
.error-text
  margin-top 4px
  margin-left 24px
  fontSzLh(12, 18)
  font-weight 500
  color $orange
  position absolute
  display none
  @media $xs
    margin-top 0
</style>
