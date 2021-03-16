<template>
  <div>
    <van-field
      v-bind="$attrs"
      :value="dateFormat(value)"
      readonly
      clickable
      :disabled="disabled"
      :right-icon="rightIcon"
      @click="onClick"
      @click-right-icon.stop="onRightIconClick"
    />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="date"
        :type="type"
        :title="title"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs';
const formatMap = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  'year-month': 'YYYY-MM',
  'month-day': 'MM-DD',
  datehour: 'YYYY-MM-DD HH',
  datetime: 'YYYY-MM-DD HH:mm',
};

export default {
  name: 'VantDatePicker',
  components: {},
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
    clearable: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      // default: 'YYYY-MM-DD',
    },
    title: {
      type: String,
      default: '选择日期',
    },
    type: {
      // date time year-month month-day datehour datetime
      type: String,
      default: 'date',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['date', 'time', 'year-month', 'month-day', 'datehour', 'datetime'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      show: false,
      date: new Date(),
    };
  },
  computed: {
    rightIcon() {
      if (this.value && this.clearable && !this.disabled) {
        return 'clear';
      }
      return this.show ? 'arrow-up' : 'arrow-down';
    },
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return;
      }
      if (this.value) {
        this.date = dayjs(this.value).$d;
      } else {
        this.date = new Date();
      }
      this.show = true;
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
      if (this.disabled) {
        return;
      }
      if (this.clearable && this.value) {
        this.$emit('change', undefined);
      } else {
        this.onClick();
      }
    },
    dateFormat(date) {
      return date && dayjs(date).format(this.format || formatMap[this.type]);
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
</style>
