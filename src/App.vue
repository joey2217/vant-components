<template>
  <div id="app">
    <van-form>
      <VantSelect
        label="Select"
        v-model="select"
        name-props="label"
        :options="options"
        @select="onSelect"
      />
      <VantDatePicker label="DatePicker" v-model="date" />
      <VantDatetimePicker label-width="120px" label="DatetimePicker" v-model="datetime" />
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
    onSelect(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
</style>
