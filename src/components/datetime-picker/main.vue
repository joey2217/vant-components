<template>
  <div>
    <van-field
      v-bind="$attrs"
      readonly
      clickable
      :disabled="disable"
      name="datetimePicker"
      right-icon="arrow-down"
      :value="value|dateTimeFilter"
      @click="onClick"
    />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="date"
        type="datetime"
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
  name: 'VantDatetimePicker',
  components: {},
  filters: {
    dateTimeFilter(date) {
      return date && dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  props: {
    value: [Date, String, Number],
    disable: {
      type: Boolean,
      default: false,
    },
    valueFormat: {
      type: String,
    },
  },
  model: {
    prop: 'value',
    event: 'change',
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
      this.show = !this.disable;
    },
    onConfirm(time) {
      this.$emit('change', time);
      this.show = false;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
