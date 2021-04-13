<template>
  <div id="user">
    <div class="loginBtn" @click="toLogin">
      <img src="../assets/user.png" alt="" />
      <div class="userInfo">
        <p class="title">{{ $store.state.username }}</p>
        <p :class="loginState === '未登录' ? 'red' : 'green'">
          {{ loginState }}
        </p>
        <img src="../assets/jtRight.png" alt="" />
      </div>
    </div>
    <ul class="userList">
      <li @click="toMyGame">
        <div class="content">
          <i class="iconfont icon-cz-bmdj"></i>
          <p>我的报名</p>
        </div>
        <img src="../assets/jtRight.png" alt="" />
      </li>
      <li @click="myGameHistory">
        <div class="content">
          <i class="iconfont icon-jilu"></i>
          <p>摇号记录</p>
        </div>
        <img src="../assets/jtRight.png" alt="" />
      </li>
    </ul>
    <ul class="userList">
      <li>
        <div class="content">
          <i class="iconfont icon-aixin"></i>
          <p>帮助中心</p>
        </div>
        <img src="../assets/jtRight.png" alt="" />
      </li>
      <li>
        <div class="content">
          <i class="iconfont icon-zu17"></i>
          <p>联系客服</p>
        </div>
        <img src="../assets/jtRight.png" alt="" />
      </li>
      <!-- <li @click="toCompany">
        <div class="content">
          <i class="iconfont icon-xinxi"></i>
          <p>企业信息</p>
        </div>
        <img src="../assets/jtRight.png" alt="" />
      </li> -->
      <li>
        <div class="content">
          <i class="iconfont icon-guanyuwomen"></i>
          <p>关于我们</p>
        </div>
        <img src="../assets/jtRight.png" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'User',
  data() {
    return {
      loginState: '未登录',
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.$store.state.loginId == ''
      ? (this.loginState = '未登录')
      : (this.loginState = '已登录');
  },
  methods: {
    toLogin() {
      if (this.$store.state.loginId == '') {
        this.$router.push('/home/login').catch((err) => {
          console.log(err);
        });
      } else {
        this.$router.push('/home/userdetails').catch((err) => {
          console.log(err);
        });
      }
    },
    toMyGame() {
      this.$router.push('/home/mygame').catch((err) => {
        console.log(err);
      });
    },
    myGameHistory() {
      this.$router.push('/home/mygamehistory').catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
<style lang="less" scoped>
#user {
  background-color: rgb(235, 233, 233);
  height: calc(100%-60px);
  .loginBtn {
    display: flex;
    width: 100%;
    justify-content: start;
    padding: 30px 20px;
    font-weight: bold;
    margin-bottom: 10px;
    background-color: #fff;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      vertical-align: top;
    }
    .title {
      font-size: 16px;
    }
    p {
      vertical-align: top;
      margin-left: 20px;
    }
    .red {
      color: red;
    }
    .green {
      color: rgb(4, 218, 111);
    }
    .userInfo {
      img {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 10px;
        top: 88px;
      }
    }
  }
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
}
</style>
