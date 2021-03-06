import Vue from 'vue'
import App from './App.vue'

import router from './router'

Vue.config.productionTip = false

//添加状态总线到Vue原型中
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
