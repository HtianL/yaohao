<template>
  <div>
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
        <!-- <mu-form-item
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
        </mu-form-item> -->
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
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
}
</script>
<style lang="less" scoped></style>
