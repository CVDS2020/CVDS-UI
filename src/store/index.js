import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment';

// import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const state = {
    user:{
       username:'',
        roleName:'',
        loginTime:'',
        loginDev:'',
        ip:'',
    },
    loginVisible:false
}
const store = new Vuex.Store({
    state,
    mutations:{
        setUserInfo(state,resData){
            state.user.username=resData.username;
            state.user.roleName=resData.role.name;
            state.user.loginTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            state.user.loginDev='';
            state.user.ip='';
        }

    },
    actions:{},
    getters:{},
})

// 3.导出store独享
export default store


// 对象的解构
const obj = {
    name: 'why',
    age: 18,
    height: 1.88,
    address: '洛杉矶'
}

const {name, height, age} = obj;



