<template>
  <div>
    <van-field
      v-bind="$attrs"
      :disabled="disabled"
      readonly
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

  props: {
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
        return this.options.map(item => ({ ...item, name: item[this.nameProps] }));
      }
      return this.options;
    },
  },
  methods: {
    onSelect(data) {
      this.$emit('select', data);
      this.show = false;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
