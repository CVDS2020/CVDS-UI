import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const state = {
    user: {
        username: '',//用户名
        roleName: '',//用户角色
        loginTime: '',
        loginDev: '',
        ip: '',
        terminal:'',//'WEB'
    },
    loginVisible: true
}
const store = new Vuex.Store({
    state,
    mutations: {
        setUserInfo(state, resData) {
            state.user.username = resData.username;
            state.user.roleName = resData.role.name;
            state.user.loginTime = resData.loginTime;
            state.user.loginDev = resData.terminal;
            state.user.ip = resData.ip;
            state.user.terminal=resData.terminal;
        },
        setLoginModalVisible(state,visible){
            state.loginVisible=visible;
        },

    },
    actions: {},
    getters: {},
})

// 3.导出store独享
export default store




