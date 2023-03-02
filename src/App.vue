<template>
  <a-config-provider :locale="locale">
    <div id="app">
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
      modalVisible: this.$store.state.loginVisible,
      //todo 调试时使用
      // modalVisible: false,
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
