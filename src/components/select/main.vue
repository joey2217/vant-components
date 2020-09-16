<template>
  <div>
    <van-field
      v-bind="$attrs"
      :disabled="disabled"
      readonly
      :value="value"
      :right-icon="show?'arrow-up':'arrow-down'"
      @click="show = !disabled"
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
  },
  methods: {
    onSelect(data, index) {
      const name = this.nameProps ? data[this.nameProps] : data.name;
      this.$emit('change', name);
      this.$emit('select', data, index);
      this.show = false;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
