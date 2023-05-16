<template>
  <div ref="select" class="select" :class="classList" @blur="open = false">
    <div class="selected" :class="{ open: open, disable: options.length < 1 }" @click="open = !open">{{ label }}</div>
    <div v-if="options.length > 0" class="items-wrap" :class="{ selectHide: !open }">
      <perfect-scrollbar>
        <div class="items">
          <div v-for="(option, i) of options" :key="i" :class="{ _active: selected === option }" @click="setSelected(option)">
            {{ option.name || option }}
          </div>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
import additionalClassCSS from '~/utils/additionalClassCSS';
import eventPath from '~/utils/eventPath';

export default {
  name: 'BSelect',
  components: {
    PerfectScrollbar,
  },
  model: {
    prop: 'default',
    event: 'change',
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: [String, Object, Array, Number],
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
    mod: {
      type: [Array, String],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: {},
      open: false,
    };
  },
  computed: {
    openClass() {
      return additionalClassCSS(this.open, 'open');
    },
    modClass() {
      return additionalClassCSS(this.mod);
    },
    typeClass() {
      return additionalClassCSS(this.type);
    },
    disableClass() {
      return additionalClassCSS(this.disable, 'disabled');
    },
    classList() {
      return Object.assign({}, this.modClass, this.typeClass, this.openClass, this.disableClass);
    },
  },
  watch: {
    default() {
      this.selected = Object.is(this.default) ? this.default : this.options.find((option) => Object.values(option).includes(this.default)) || this.options[0];
    },
  },
  created() {
    if (this.default) {
      this.selected = Object.is(this.default) ? this.default : this.options.find((option) => Object.values(option).includes(this.default)) || this.options[0];
    } else {
      this.selected = this.options[0];
    }
  },
  mounted() {
    this.clickOutsideHandler = this.checkClickOutside.bind(this);
    window.addEventListener('click', this.clickOutsideHandler);
    if (this.default) return;
    this.setSelected(this.selected);
  },
  beforeDestroy() {
    window.addEventListener('click', this.clickOutsideHandler);
  },
  methods: {
    setSelected(option) {
      this.selected = option;
      this.open = false;
      this.$emit('change', option);
    },
    sortType() {
      this.$emit('update:sort', ['asc', 'desc'][+(this.sort === 'asc')]);
    },
    dropdownClose(event) {
      const dropDownRef = this.$refs.dropdown;
      const path = eventPath(event);
      if (!path.includes(dropDownRef)) {
        this.open = false;
      }
    },
    checkClickOutside(event) {
      const select = this.$refs.select;
      const isClickOutside = select && !select.contains(event.target);
      if (isClickOutside) {
        this.open = false;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.select
  position relative
  width 100%
  text-align left
  outline none
  height 56px
  @media $xs
    height 48px

  &._error
    .selected
      color $orange
  .selected
    display flex
    align-items center
    background $green
    border-radius 56px
    border 2px solid $white
    fontSzLh(16, 24)
    font-weight 500
    color $white
    cursor pointer
    user-select none
    height 56px
    padding 0 24px
    @media $xs
      height 48px
    &:after
      position absolute
      content url("~static/svg/acc-arrow.svg");
      top 50%
      transform translateY(-50%)
      right 24px
      width 24px
      height 24px
      transition(all)
    &.disable
      color rgba($white, 0.5)
      pointer-events none
      &:after
        opacity 0.5
    &.open
      border-color $yellow
      &:after
        transform translateY(-50%) rotate(180deg)
        transition(all)
  .items-wrap
    color $green
    border-radius 24px
    overflow hidden
    position absolute
    background $dark
    border 2px solid $yellow
    top calc(100% + 6px)
    left 0
    right 0
    z-index 10
    padding 8px
    .items
      div
        color $green
        padding 4px 16px
        cursor pointer
        user-select none
        border-radius 34px
        white-space nowrap
        fontSzLh(14, 24)
        +hover()
          background $grey
        &._active
          background $yellow
  .selectHide
    display none
  .ps
    height max-content
    max-height 200px
    ::v-deep .ps__rail-y
      +hover()
        background-color transparent !important
        opacity 1
      .ps__thumb-y
        background $yellow
        border-radius 2px
</style>
