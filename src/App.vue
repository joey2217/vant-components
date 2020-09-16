<template>
  <div id="app">
    <van-form>
      <VantSelect
        v-model="select"
        label="Select"
        name-props="label"
        :options="options"
        @select="onSelect"
      />
      <VantDatePicker v-model="date" value-format="YYYY-MM-DD" label="DatePicker" />
      <VantDatetimePicker
        label-width="120px"
        value-format="YYYY-MM-DD HH:mm"
        label="DatetimePicker"
        v-model="datetime"
      />
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      date: new Date(),
      datetime: new Date(),
      select: 'Vue',
      options: [
        {
          label: 'Vue',
          value: 'vue',
        },
        {
          label: 'React',
          value: 'react',
        },
      ],
    };
  },
  components: {},
  methods: {
    onSelect(data, index) {
      console.log(data, index);
    },
  },
};
</script>

<style lang="scss">
</style>
