import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
// axios.defaults.withCredentials = true;


Vue.use(Antd)
// Vue.config.productionTip = false;


new Vue({
    el:'#app',
    router,
    store,
    render: (h) => h(App)
})