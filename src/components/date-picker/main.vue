<template>
  <div>
    <van-field
      v-bind="$attrs"
      :value="value|dateFilter"
      readonly
      clickable
      :disabled="disabled"
      :right-icon="show?'arrow-up':'arrow-down'"
      @click="onClick"
    />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="date"
        type="date"
        title="选择日期"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'VantDatePicker',
  components: {},
  filters: {
    dateFilter(date) {
      return date && dayjs(date).format('YYYY-MM-DD');
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Date, String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    valueFormat: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
      date: new Date(),
    };
  },
  computed: {},
  methods: {
    onClick() {
      this.date = this.value || new Date();
      this.show = !this.disabled;
    },
    onConfirm(time) {
      if (this.formatter) {
        this.$emit('change', this.parseTime(time, this.formatter));
      } else {
        this.$emit('change', time);
      }
      this.show = false;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
