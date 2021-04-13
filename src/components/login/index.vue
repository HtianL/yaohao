<template>
  <div id="login">
    <mu-form ref="form" :model="loginForm" class="mu-demo-form">
      <mu-form-item label="手机号" prop="mobile" :rules="mobileRules">
        <mu-text-field
          v-model="loginForm.mobile"
          prop="mobile"
          placeholder="请输入真实的手机号"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item label="密码" prop="password" :rules="passwordRules">
        <mu-text-field
          type="password"
          v-model="loginForm.password"
          prop="password"
          placeholder="请输入正确的密码"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="primary" @click="login">登录</mu-button>
        <p class="forget" @click="toForget">忘记密码</p>
        <p @click="toRegister" class="register">注册</p>
      </mu-form-item>
    </mu-form>
    <mu-dialog title="登录结果" width="360" :open.sync="openSimple">
      {{ loginMsg }}
      <mu-button slot="actions" flat color="primary" @click="close"
        >确认</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      openSimple: false,
      loginMsg: '',
      mobileRules: [
        { validate: (val) => !!val, message: '别忘了填写您的手机号' },
        {
          validate: (val) => /^[1][3,4,5,7,8][0-9]{9}$/.test(val),
          message: '您填写的手机号码格式不对',
        },
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '别忘了填写您的密码' },
        {
          validate: (val) => val.length >= 6 && val.length <= 10,
          message: '密码长度大于6小于10',
        },
      ],
      loginForm: {
        mobile: '',
        password: '',
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    // 登录
    login() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.$request
            .windPost('/api/login', {
              mobile: this.loginForm.mobile,
              pwd: this.loginForm.password,
            })
            .then((res) => {
              if (res.code == 1) {
                this.$router.replace('/home/news').catch((err) => {
                  console.log(err);
                });
                this.$store.commit('getLoginId', res.data.id);
                this.$store.commit('getName', res.data.name);
              } else {
                this.openSimple = true;
                this.loginMsg = res.msg;
              }
            });
        }
      });
    },
    // 前往注册页面
    toRegister() {
      this.$router.push('/home/register').catch((err) => {
        console.log(err);
      });
    },
    //前往忘记密码页面
    toForget() {},
    // 关闭结果弹窗
    close() {
      this.openSimple = false;
    },
  },
};
</script>
<style lang="less" scoped>
#login {
  width: 100%;
  height: calc(100%-60px);
  padding: 140px 20px 20px 20px;
  .mu-button {
    width: 100%;
    margin: 6px 0;
  }
  p {
    position: absolute;
    top: 60px;
    color: rgb(131, 130, 130);
  }
  .register {
    right: 0;
  }
  .forget {
    left: 0;
  }
}
.mu-demo-form {
  width: 100%;
}
</style>
