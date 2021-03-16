<template>
  <div>
    <van-field
      v-bind="$attrs"
      :value="display"
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
        @confirm="onConfirm"
        @cancel="show = false"
      >
        <template #title>
          <div class="title">
            <div
              class="start tab"
              :class="{ active: active === 0 }"
              @click="onActive(0)"
            >
              开始
            </div>
            <div
              class="end tab"
              :class="{ active: active === 1 }"
              @click="onActive(1)"
            >
              结束
            </div>
          </div>
        </template>
      </van-datetime-picker>
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
  name: 'VantDateRange',
  components: {},
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Array,
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
    type: {
      // date time year-month month-day datehour datetime
      type: String,
      default: 'date',
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return (
          [
            'date',
            'time',
            'year-month',
            'month-day',
            'datehour',
            'datetime',
          ].indexOf(value) !== -1
        );
      },
    },
  },
  data() {
    return {
      show: false,
      active: 0,
      dateRange: [],
      date: new Date(),
    };
  },
  computed: {
    rightIcon() {
      if (
        this.value &&
        this.value.length > 0 &&
        this.clearable &&
        !this.disabled
      ) {
        return 'clear';
      }
      return this.show ? 'arrow-up' : 'arrow-down';
    },
    display() {
      const [start, end] =
        this.value && this.value.length > 0 ? this.value : [];
      if (start && end) {
        return this.dateFormat(start) + '~' + this.dateFormat(end);
      }
      return '';
    },
    unit() {
      const dateMap = {
        date: 'day',
        time: 'hour',
        'year-month': 'month',
        'month-day': 'day',
        datehour: 'hour',
        datetime: 'minute',
      };
      return dateMap[this.type];
    },
  },
  methods: {
    onActive(active) {
      const [start, end] = this.dateRange;
      if (active === 0) {
        // start
        this.dateRange = [start, this.date];
        // this.maxDate = dayjs(this.date).subtract(1, this.unit).$d;
        this.date = start;
      } else {
        // end
        this.dateRange = [this.date, end];
        // this.minDate = dayjs(this.date).add(1, this.unit).$d;
        this.date = end;
      }
      this.active = active;
    },
    onClick() {
      if (this.disabled) {
        return;
      }
      if (this.value && Array.isArray(this.value) && this.value.length > 0) {
        this.dateRange = this.value;
        this.date = dayjs(this.value[0]).$d;
      } else {
        const now = Date.now();
        const end = dayjs(now).add(1, this.unit).$d;
        this.dateRange = [new Date(now), end];
        this.date = new Date(now);
        this.maxDate = end;
      }
      this.active = 0;
      this.show = true;
    },
    onConfirm() {
      let [start, end] = this.dateRange;
      if (this.active === 0) {
        start = this.date;
      } else {
        end = this.date;
      }
      if (dayjs(start).isAfter(dayjs(end))) {
        this.$toast.fail('开始时间必须小于结束时间!');
        return;
      }
      if (this.valueFormat) {
        if (this.valueFormat === 'timestamp') {
          this.$emit('change', [dayjs(start).valueOf(), dayjs(end).valueOf()]);
        } else {
          this.$emit('change', [
            dayjs(start).format(this.valueFormat),
            dayjs(end).format(this.valueFormat),
          ]);
        }
      } else {
        this.$emit('change', [start, end]);
      }
      this.show = false;
    },
    onRightIconClick() {
      if (this.disabled) {
        return;
      }
      if (this.clearable && this.value) {
        this.$emit('change', []);
        this.dateRange = [];
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
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  .tab {
    border: 1px solid #ebedf0;
    padding: 4px 16px;
    color: #576b95;
  }
  .active {
    color: #1989fa;
  }
}
</style>
