import Vue from 'vue'
import App from './App.vue'
import router from "../router";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// import axios from 'axios'
// axios.defaults.withCredentials = true;


Vue.use(Antd)
// Vue.config.productionTip = false;


new Vue({
    el:'#app',
    router,
    render: (h) => h(App)
})