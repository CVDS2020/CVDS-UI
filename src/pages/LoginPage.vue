<template>
  <div class="page-login" :style="loginStyle" >
    <header class="login-header">
      <div>
        <img src="@/assets/logo.png" alt="" class="logo">
      </div>
      <div>铁路纵横车辆视频监控管理系统</div>
    </header>
    <div class="login-container">
      <div v-if='userImageVisible'>
        <img :src="userImage" alt="" class="login-userimg">
      </div>
      <a-form id="components-form-demo-normal-login" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item>
          <a-input v-decorator="[
                      'userName',
                      { rules: [{ required: true, message: 'Please input your username!' }] },
                    ]" placeholder="Username">
            <a-icon type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-decorator="[
                      'password',
                      { rules: [{ required: true, message: 'Please input your Password!' }] },
                    ]" type="password" placeholder="Password">
            <a-icon type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button block type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>

  </div>
</template>

<script>
export default {
    name: 'LoginPage',
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' })
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                    this.$router.push('home')
                }
            })
        }
    },
    data() {
        return {
            loginStyle: {
                backgroundImage: `url(${require('@/assets/img/loginbg.png')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            },
            userName: '',
            userImage: require('@/assets/img/user.png'),
            userImageVisible: true
        }
    }
}
</script>

<style lang="css">
.page-login {
    height: 100vh;
}
.login-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    background-image: -webkit-linear-gradient(
        top,
        rgb(0, 0, 230),
        rgb(0, 0, 230)
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
    div {
        height: 60px;
        line-height: 60px;
        float: left;
        margin-left: 15px;
        margin-top: 15px;
        .logo {
            width: 50px;
            height: 50px;
            margin: 5px;
            border-radius: 6px;
        }
    }
}
.login-container {
    width: 368px;
    height: 300px;
    border: 1px solid #f2f6fc;
    border-radius: 4px;
    box-shadow: 0 0 20px #f2f6fc;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -183px;

    .login-userimg {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -60px;
        margin-top: -260px;
        transform: all 2s;
    }

    .login-form {
        padding: 76px 20px 0;
    }
}
</style>
