<template>
  <div id="app">
    <van-form>
      <VantSelect
        v-model="select"
        label="Select"
        clearable
        name-props="label"
        :options="options"
        @select="onSelect"
      />
      <VantDatePicker
        v-model="date"
        clearable
        value-format="YYYY-MM-DD"
        label="DatePicker"
      />
      <VantDateRange
        v-model="dateRange"
        label="DateRange"
        clearable
        type="datetime"
        label-width="100px"
      />
    </van-form>
    <a
      href="https://github.com/BurNing1993/vant-components"
      target="_blank"
      rel="noopener noreferrer"
      class="github"
    >
      <img :src="require('./github.svg')" alt="github" />Github
    </a>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      date: new Date(),
      select: 'Vue',
      dateRange: [],
      options: [
        {
          text: 'Vue',
          value: 'vue',
        },
        {
          text: 'React',
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
.github {
  position: fixed;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
