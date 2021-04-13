<template>
  <div id="register">
    <div class="tips">
      <p>
        为了确保账号的安全和正确使用，依照国家相关法律法规，需填写实名认证材料，感谢理解与支持。
      </p>
    </div>
    <div class="form">
      <mu-form ref="form" :model="form" class="mu-demo-form">
        <mu-form-item label="真实姓名" prop="name" :rules="nameRules">
          <mu-text-field
            v-model="form.name"
            prop="name"
            placeholder="请输入真实的姓名"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field
            type="password"
            v-model="form.password"
            prop="password"
            placeholder="请输入6-10位的密码"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="确认密码" prop="password1" :rules="passwordRules1">
          <mu-text-field
            type="password"
            v-model="form.password1"
            prop="password1"
            placeholder="请确认您的的密码"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="手机" prop="mobile" :rules="mobileRules">
          <mu-text-field
            v-model="form.mobile"
            prop="mobile"
            placeholder="请输入真实的手机号"
          ></mu-text-field>
        </mu-form-item>
        <!-- <mu-form-item label="身份证号" prop="sfz" :rules="sfzRules">
          <mu-text-field
            v-model="form.sfz"
            prop="sfz"
            placeholder="请输入真实的身份证"
          ></mu-text-field>
        </mu-form-item> -->
        <mu-form-item
          label="验证码"
          prop="code"
          :rules="codeRules"
          class="code"
        >
          <mu-text-field
            v-model="form.code"
            prop="code"
            placeholder="请输入正确的验证码"
          ></mu-text-field>
          <mu-button color="primary" @click="getCode">获取验证码</mu-button>
        </mu-form-item>
        <!-- <mu-form-item class="uploaditem">
          <p class="upload">证件</p>
          <el-upload
            action="/api/upload"
            list-type="picture-card"
            accept="image/*"
            :on-preview="handlePictureCardPreview"
            :on-success="getFileList"
          >
            <i class="el-icon-plus"></i> </el-upload
        ></mu-form-item> -->
        <mu-form-item class="registerBtn">
          <mu-button color="primary" @click="submit">注册</mu-button>
        </mu-form-item>
      </mu-form>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <mu-dialog title="Dialog" width="360" :open.sync="showResult">
      {{ result }}
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog"
        >确认</mu-button
      >
    </mu-dialog>
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
      passwordRules1: [
        { validate: (val) => !!val, message: '请确认您的密码' },
        {
          validate: (val) => this.form.password === val,
          message: '确认密码与密码不匹配',
        },
      ],
      nameRules: [
        { validate: (val) => !!val, message: '不要忘记填写您的姓名' },
      ],
      mobileRules: [
        { validate: (val) => !!val, message: '不要忘记填写您的手机号码' },
        {
          validate: (val) => /^[1][3,4,5,7,8][0-9]{9}$/.test(val),
          message: '您填写的手机号码格式不对',
        },
      ],
      form: {
        name: '',
        password: '',
        password1: '',
        mobile: '',
        // sfz: '',
        code: '',
        imgList: [],
      },
      showResult: false,
      result: '',
      dialogImageUrl: '',
      dialogVisible: false,
      imgList: [],
    };
  },
  created() {},
  computed: {},
  methods: {
    submit() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.form.imgList = this.imgList.map((d) => {
            return d.response.data;
          });
          this.$request
            .windPost('/api/register', {
              mobile: this.form.mobile,
              sfz: this.form.sfz,
              name: this.form.name,
              pwd: this.form.password,
              code: this.form.code,
              img: this.form.imgList,
            })
            .then((res) => {
              if (res.code == 1) {
                this.$store.commit('getLoginId', res.data.id);
                this.$store.commit('getName', res.data.name);
              }
              this.result = res.msg;
              this.showResult = true;
            });
        }
      });
    },
    //获取验证码
    getCode() {
      this.$request
        .windPost('/api/code', {
          mobile: this.form.mobile,
        })
        .then((res) => {});
    },
    closeSimpleDialog() {
      if (this.result == '注册成功') {
        this.$router.replace('/home/news').catch((err) => {
          console.log(err);
        });
      }
      this.showResult = false;
    },
    //图片上传
    // 点击图片删除
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取上传列表方法
    getFileList(response, file, fileList) {
      this.imgList = fileList;
    },
  },
};
</script>
<style lang="less" scoped>
#register {
  width: 100%;
  height: calc(100%-60px);
  .tips {
    line-height: 20px;
    color: #666;
    padding: 10px 30px;
    margin-bottom: 10px;
    background-color: rgb(235, 233, 233);
  }
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
