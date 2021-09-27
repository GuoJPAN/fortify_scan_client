// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
// import './assets/css/theme-green/index.css' // 浅绿色主题
import 'babel-polyfill'
import echarts from 'echarts' // 全局引入echarts
import api from './api/index'
// highlight.js代码高亮插件
import Highlight from './utils/highlight' // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight)

require('./mock/index.js')

Vue.prototype.http = api
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
