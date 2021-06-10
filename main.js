import Vue from 'vue'
import App from './App'
import store from './store'
import api from '@/common/api/base'

Vue.prototype.$api = api
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
