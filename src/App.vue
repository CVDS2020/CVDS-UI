<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <!--      <button @click="login">登陆</button>-->
      <!--      <button @click="chartdata">查询</button>-->
      <home-page></home-page>
      <a-modal
          title="用户登陆"
          centered
          :width="400"
          :visible="modalVisible"
          :closable="false"
      >
        <div style="padding: 40px">
          <a-input v-model="userName" class="input" style="margin-bottom: 20px" placeholder="请输入用户名"></a-input>
          <a-input v-model="pwd" class="input" placeholder="请输入密码"></a-input>
        </div>
        <template #footer>
          <a-button type="primary" @click="login">登陆</a-button>
        </template>
      </a-modal>

    </div>
  </a-config-provider>
</template>

<script>
//汉化
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import HomePage from "@/pages/HomePage";
import {request} from "@/network/request";
import MD5 from "@/utils/MD5"
import axios from "axios";

export default {
  name: 'App',
  components: {
    HomePage,
  },
  data() {
    return {
      flag: 0,
      locale: zhCN,
      // modalVisible: this.$store.state.loginVisible,
      modalVisible: false,
      userName: 'admin',
      pwd: 'admin',
    };
  },
  methods: {
    login() {
      request({
        url: '/api/user/login',
        method: 'get',
        params: {
          username: this.userName,
          password: this.pwd.MD5(32),
          terminal:this.$store.state.user.terminal,
        }
      }).then(res => {
        if (res.code == 0) {
          this.$store.commit('setLoginModalVisible',false);
          this.modalVisible=this.$store.state.loginVisible;
          this.$store.commit('setUserInfo', res.data);
          this.$router.replace('/dashboard');
        }else{
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
  },
  created() {
    // let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // delete arr[3];
    // console.log(arr.length)
    // console.log(arr)
    // delete arr[5]
    // let arr1 = arr.filter(d => d)
    // console.log(arr)
    // console.log(arr1)
    // if (this.flag) {
    //   console.log('if this.flag')
    // } else {
    //   console.log('else this.flag')
    // }
    // if (!this.flag) {
    //   console.log('!this.flag')
    // } else {
    //   console.log('else !this.flag')
    // }
    // let a=[1,2,3,4,5,6,1,2];
    // let s=new Set(a);
    // let na=Array.from(s)
    // console.log('a:',a,'na:',na)
    //
    // let m=new Map();
    // m.set('a',1);
    // m.set('a',1);
    // m.set('b',2);
    // console.log('m:',m)
    // let ma=[];
    // for(let [key,value] of m.entries()){
    //   let obj={username:key,userid:value}
    //   ma.push(obj);
    // }
    // console.log('ma:',ma);
  }
}
</script>

<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
}

.input {
  width: 200px;
}
</style>
