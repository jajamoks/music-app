import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'

import '@/assets/stylus/index.styl'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
	loading: require('@/assets/images/default.png')
})

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
