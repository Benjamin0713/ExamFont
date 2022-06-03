import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/element";
// 引入全局样式表
import "./assets/css/global.css";
// 导入字体图标
import "./assets/fonts/iconfont.css";
// 配置axios
import axios from "axios";
import * as types from "./store/type";
// API接口基准地址--配置请求的根路径
axios.defaults.baseURL = "http://127.0.0.1:8888";
// axios请求拦截器
axios.interceptors.request.use(config => {
  console.log(config);
  // 在最后必须 return config
  config.headers.token = window.sessionStorage.getItem(types.author);
  return config;
});
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

// Vue.filter('format', function(date) {
//   var json_date = new Date(date).toJSON();
//   return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
// })
