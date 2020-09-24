<template>
  <div>
    <van-field
      v-bind="$attrs"
      :disabled="disabled"
      readonly
      :value="value"
      :right-icon="rightIcon"
      @click="show = !disabled"
      @click-right-icon.stop="onRightIconClick"
    />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="show = false"
    />
  </div>
</template>

<script>
export default {
  name: 'VantSelect',
  components: {},
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: [String, Number],
    options: {
      type: Array,
      require: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    nameProps: {
      type: String,
      default: 'name',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    actions() {
      if (this.nameProps) {
        return this.options.map((item) => ({
          ...item,
          name: item[this.nameProps],
        }));
      }
      return this.options;
    },
    rightIcon() {
      if (this.value && this.clearable && !this.disabled) {
        return 'clear';
      }
      return this.show ? 'arrow-up' : 'arrow-down';
    },
  },
  methods: {
    onSelect(data, index) {
      const name = this.nameProps ? data[this.nameProps] : data.name;
      this.$emit('change', name);
      this.$emit('select', data, index);
      this.show = false;
    },
    onRightIconClick() {
      if (this.disabled) {
        return;
      }
      if (this.clearable && this.value) {
        this.$emit('change', undefined);
        const [row] = this.actions;
        if (row) {
          const keys = Object.keys(row);
          const data = {};
          keys.forEach((key) => {
            data[key] = undefined;
          });
          this.$emit('clear', data);
          this.$emit('select', data);
        }
      } else {
        this.show = !this.disabled;
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
