<template>
  <div id="changePassword">
    <div class="form">
      <mu-form ref="form" :model="form" class="mu-demo-form">
        <mu-form-item label="旧密码" prop="password">
          <mu-text-field
            type="password"
            v-model="form.password"
            prop="password"
            placeholder="请输入旧密码"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="新密码" prop="password1" :rules="passwordRules">
          <mu-text-field
            type="password"
            v-model="form.password1"
            prop="password1"
            placeholder="请确认新密码"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item class="registerBtn">
          <mu-button color="primary" @click="changePassword"
            >确认修改</mu-button
          >
        </mu-form-item>
      </mu-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordRules: [
        { validate: (val) => !!val, message: '不要忘记填写您的密码' },
        {
          validate: (val) => val.length >= 6 && val.length <= 10,
          message: '密码长度大于6小于10',
        },
      ],
      form: {
        password: '',
        password1: '',
      },
    };
  },
  created() {},
  computed: {},
  methods: {
    changePassword() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.$request
            .windPost('/api/savepwd', {
              user_id: this.$store.state.loginId,
              pwd: this.form.password1,
            })
            .then((res) => {
              if (res.code == 1) {
                window.localStorage.clear();
                this.$router.replace('/home/login').catch((err) => {
                  console.log(err);
                });
              }
            });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
#changePassword {
  width: 100%;
  height: calc(100%-60px);
  .form {
    padding: 10px 20px;
    .code {
      .mu-input {
        width: 50%;
      }
      .mu-button {
        margin-top: -4px;
      }
    }
    .registerBtn {
      .mu-button {
        width: 100%;
        margin: 6px 0;
      }
    }
    .uploaditem {
      margin-top: 50px;
    }
    .upload {
      position: absolute;
      top: -30px;
      font-size: 14px;
      color: #000;
      font-weight: bold;
    }
  }
}
</style>
