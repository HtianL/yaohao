<template>
  <div id="signUp">
    <div class="form">
      <mu-form ref="form" :model="form" class="mu-demo-form">
        <mu-form-item label="名称" prop="name">
          <mu-text-field
            v-model="form.name"
            prop="name"
            placeholder="请输入绑定人或企业名称"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="联系方式" prop="mobile" :rules="mobileRules">
          <mu-text-field
            v-model="form.mobile"
            prop="mobile"
            placeholder="请输入绑定人或企业法人联系方式"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item label="证件号码" prop="sfz">
          <mu-text-field
            v-model="form.sfz"
            prop="sfz"
            placeholder="请输入相关证件号码"
          ></mu-text-field>
        </mu-form-item>
        <mu-form-item class="uploaditem">
          <p class="upload">证件</p>
          <el-upload
            action="/api/userupload"
            list-type="picture-card"
            accept="image/*"
            :on-preview="handlePictureCardPreview"
            :on-success="getFileList"
          >
            <i class="el-icon-plus"></i> </el-upload
        ></mu-form-item>
        <mu-form-item class="signUpBtn">
          <mu-button color="primary" @click="signUp">确认报名</mu-button>
        </mu-form-item>
      </mu-form>
      <mu-dialog title="报名结果" width="360" :open.sync="openSimple">
        {{ enlistResult }}
        <mu-button slot="actions" flat color="primary" @click="close"
          >确认</mu-button
        >
      </mu-dialog>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        mobile: '',
        sfz: '',
        imgList: '',
      },
      dialogImageUrl: '',
      enlistResult: '',
      dialogVisible: false,
      openSimple: false,
    };
  },
  created() {
    this.getNews();
  },
  computed: {},
  methods: {
    //图片上传
    // 点击图片删除
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取上传列表方法
    getFileList(response, file, fileList) {
      fileList.forEach((d) => {
        if (this.form.imgList) {
          this.form.imgList = this.form.imgList + ',' + d.response.data;
        } else {
          this.form.imgList = d.response.data;
        }
      });
    },
    //报名
    signUp() {
      this.$refs.form.validate().then((res) => {
        if (res) {
          this.$request
            .windPost('/api/saveoneapply', {
              user_id: this.$store.state.loginId,
              name: this.form.name,
              mobile: this.form.mobile,
              certificate: this.form.sfz,
              lottery_id: this.$store.state.detailsId[0],
              img: this.form.imgList,
            })
            .then((res) => {
              this.enlistResult = res.msg;
              this.openSimple = true;
            });
        }
      });
    },
    close() {
      this.openSimple = false;
      this.$router.replace('/home/article').catch((err) => {
        console.log(err);
      });
    },
    //已报名用户信息
    getNews() {
      this.$request
        .windPost('/api/getrecording', {
          user_id: this.$store.state.loginId,
          summary_id: this.$store.state.detailsId[0],
        })
        .then((res) => {
          if (res.data) {
            this.form.name = res.data.name;
            this.form.mobile = res.data.mobile;
            this.form.sfz = res.data.certificate;
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
#signUp {
  width: 100%;
  height: calc(100%-60px);
  .form {
    padding: 10px 20px;
    .signUpBtn {
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
