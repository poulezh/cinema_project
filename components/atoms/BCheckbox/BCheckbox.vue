<template>
  <div class="checkbox" :class="classList">
    <input :id="id" :name="name" type="checkbox" class="checkbox__input" required :checked="checked" @change="$emit('change', value)" />
    <label :for="id" class="checkbox__label"><slot></slot></label>
  </div>
</template>

<script>
import additionalClassCSS from '~/utils/additionalClassCSS';

export default {
  name: 'BCheckbox',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    id: {
      type: [Number, String],
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    mod: {
      type: [Array, String],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Array, Boolean, Number],
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modClass() {
      return additionalClassCSS(this.mod);
    },
    classList() {
      return Object.assign({}, this.modClass, this.disableClass, this.errorClass);
    },
  },
};
</script>

<style lang="stylus" scoped>
.checkbox
  cursor pointer
  height 16px
  position relative
  .checkbox__input
    position absolute
    left 0
    top 0
    width 1px
    height 1px
    opacity 0
    cursor pointer
    &:disabled~.checkbox__label:before
      opacity 0.25
      pointer-events none
    &:checked~.checkbox__label:before
      background $yellow url('~static/svg/star.svg') no-repeat center / 0
      background-size 12px 12px
      border-color $yellow
      transition(all)
    &:checked:hover~.checkbox__label:before
      background-size 8px 8px
      transition(all)
    &.error
      & ~ label
        &:before
          border 1px solid $orange
  .checkbox__label
    display block
    fontSzLh(14, 24)
    font-weight 500
    color $white
    padding-left 22px
    position relative
    cursor pointer
    &:before
      content ''
      position absolute
      left 0
      top 4px
      width 16px
      height 16px
      border 1px solid $white
      border-radius 4px
      transition(all)
    & a
      margin-left 4px
      color $yellow
      transition(all)
      +hover()
        color $white
        transition(all)
    +hover()
      &:before
        border-color $yellow
        background-size 16px 16px
        transition(all)
</style>
