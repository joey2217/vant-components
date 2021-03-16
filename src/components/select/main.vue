<template>
  <div>
    <van-field
      v-bind="$attrs"
      readonly
      clickable
      :disabled="disabled"
      :value="value"
      :right-icon="rightIcon"
      @click="show = !disabled"
      @click-right-icon.stop="onRightIconClick"
    />
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
         :title="title"
        :columns="columns"
        @cancel="show = false"
        @confirm="onSelect"
      />
    </van-popup>
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
    textProps: {
      type: String,
      default: 'text',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '单选',
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    columns() {
      if (this.textProps) {
        return this.options.map((item) => ({
          ...item,
          text: item[this.textProps],
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
      const name = this.textProps ? data[this.textProps] : data.text;
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
        const [row] = this.columns;
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
  created() {
  },
};
</script>

<style lang="scss" scoped>
</style>
