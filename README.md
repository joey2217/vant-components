# vant-components

## 说明

> vant-components 是 Vant 的扩展和封装,方便使用.使用必须基于[Vue.js](https://cn.vuejs.org/) 和 [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN/home).

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
