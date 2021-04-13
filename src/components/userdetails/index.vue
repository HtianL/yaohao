<template>
  <div>
    <ul class="userList">
      <li>
        <div class="content">
          <i class="iconfont icon-shimingrenzheng"></i>
          <p>实名认证:{{ $store.state.username }}</p>
        </div>
      </li>
      <!-- <li>
        <div class="content">
          <i class="iconfont icon-shouji"></i>
          <p>手机:{{ $store.state.phone }}</p>
        </div>
      </li> -->
      <li @click="toChangePassword">
        <div class="content">
          <i class="iconfont icon-mima"></i>
          <p>修改密码</p>
        </div>
        <img src="../../assets/jtRight.png" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    toChangePassword() {
      this.$router.replace('/home/changepassword').catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.userList {
  margin-bottom: 10px;
  li {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    img {
      width: 20px;
      height: 20px;
    }
    .content {
      display: flex;
      justify-content: start;
      align-items: center;
      i {
        font-size: 20px;
        margin-right: 10px;
        color: #2196f3;
      }
    }
  }
}
</style>
