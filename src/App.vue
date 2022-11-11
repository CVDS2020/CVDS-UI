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
      locale: zhCN,
      modalVisible: true,
      // modalVisible: false,
      userName: 'admin',
      pwd: 'admin'
    };
  },
  methods: {
    login() {
      request({
        url: '/api/user/login',
        method: 'get',
        params: {
          username: this.userName,
          password: this.pwd.MD5(32)
        }
      }).then(res => {
        if (res.code == 0) {
          this.modalVisible = false;
          this.$router.replace('/dashboard');
          // alert('登陆成功！')
        }
      }).catch(err => {
        // console.log(err);
        alert('登陆失败')
      })
    },
  },
  created() {
    let arr=[0,1,2,3,4,5,6,7,8];
    delete arr[3];
    console.log(arr.length)
    console.log(arr)
    delete arr[5]
    let arr1 = arr.filter(d => d)
    console.log(arr)
    console.log(arr1)
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
