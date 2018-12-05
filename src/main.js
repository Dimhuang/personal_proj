// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import axios from 'axios'
import { router } from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import '@/assets/js/ydui.flexible.js'
import store from './store'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import {post,fetch,patch,put} from '@/axios/request'
//import apiConfig from '../config/api.config'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(YDUI);
Vue.use(preview)
Vue.use(infiniteScroll)
Vue.prototype.$axios = axios
Vue.config.productionTip = false


//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
