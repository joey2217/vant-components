# vant-components

## 说明

> vant-components 是 Vant 的扩展和封装,方便使用.使用必须基于[Vue.js](https://cn.vuejs.org/) 和 [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN/home).

## Demo

<https://vant-components.vercel.app/>

## 使用

### 安装

```sh
yarn add vant-components  # or npm install vant-components --save
```

### 全部引入

```js
// main.js
import Vue from "vue";
import VantComponents from "vant-components";

Vue.use(VantComponents);
```

### 按需引入组件

```js
// main.js
import Vue from "vue";
import { Select } from "vant-components";

Vue.use(Select);
```

## 组件

### Select

```js
<VantSelect
    label="Select"
    v-model="select"
    :options="options"
    @select="onSelect"
/>
```

> Select 组件为 vant field 和 action-sheet 组合.

- Props

| 参数           | 说明                                                        | 类型          | 默认值 |
| -------------- | ----------------------------------------------------------- | ------------- | ------ |
| v-model        | 绑定值                                                      | string/number | -      |
| options        | 选项                                                        | any[]         | -      |
| disabled       | 是否禁用                                                    | boolean       | false  |
| name-props     | 显示字段的 key                                              | string        | name   |
| 其他(label...) | 同[Field](https://vant-contrib.gitee.io/vant/#/zh-CN/field) | -             | -      |

- Events

| 事件名称 | 说明           | 回调参数                  |
| -------- | -------------- | ------------------------- |
| select   | 点击选项时触发 | (option:any,index:number) |

### DatePicker

```js
<VantDatePicker label="DatePicker" v-model="date" />
```

> DatePicker 组件为 vant field 和 datetime-picker 组合.

- Props

| 参数           | 说明                                                            | 类型                                                                   | 默认值 |
| -------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- | ------ |
| v-model        | 绑定值                                                          | string/number                                                          | -      |
| disabled       | 是否禁用                                                        | boolean                                                                | false  |
| value-format   | 可选，绑定值的格式。不指定则绑定值为 Date 对象(常用 YYYY-MM-DD) | [dayjs Format](https://day.js.org/docs/zh-CN/display/format)/timestamp | -      |
| 其他(label...) | 同[Field](https://vant-contrib.gitee.io/vant/#/zh-CN/field)     | -                                                                      | -      |

### DateTimePicker

```js
<VantDatetimePicker
  label-width="120px"
  label="DatetimePicker"
  v-model="datetime"
/>
```

> VantDatetimePicker 组件为 vant field 和 datetime-picker 组合.

- Props

| 参数         | 说明                                                                     | 类型                                                                   | 默认值 |
| ------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------ |
| value-format | 可选，绑定值的格式。不指定则绑定值为 Date 对象(常用 YYYY-MM-DD HH:mm) | [dayjs Format](https://day.js.org/docs/zh-CN/display/format)/timestamp | -      |
| 其他         | 同 DatePicker                                                            | -                                                                      | -      |
