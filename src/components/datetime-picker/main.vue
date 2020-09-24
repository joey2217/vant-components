<template>
  <div>
    <van-field
      v-bind="$attrs"
      readonly
      clickable
      :disabled="disabled"
      name="datetimePicker"
      :right-icon="rightIcon"
      :value="value|dateTimeFilter"
      @click="onClick"
      @click-right-icon.stop="onRightIconClick"
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
      return date && dayjs(date).format('YYYY-MM-DD HH:mm');
    },
  },
  props: {
    value: [Date, String, Number],
    disabled: {
      type: Boolean,
      default: false,
    },
    valueFormat: {
      type: String,
    },
    clearable: {
      type: Boolean,
      default: false,
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
  computed: {
    rightIcon() {
      if (this.value && this.clearable) {
        return 'clear';
      }
      return this.show ? 'arrow-up' : 'arrow-down';
    },
  },
  methods: {
    onClick() {
      this.date = this.value || new Date();
      this.show = !this.disabled;
    },
    onConfirm(time) {
      if (this.valueFormat) {
        if (this.valueFormat === 'timestamp') {
          this.$emit('change', dayjs(time).valueOf());
        } else {
          this.$emit('change', dayjs(time).format(this.valueFormat));
        }
      } else {
        this.$emit('change', time);
      }
      this.show = false;
    },
    onRightIconClick() {
      if (this.clearable && this.value) {
        this.$emit('change', undefined);
      } else {
        this.onClick();
      }
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
