<template>
  <div id="mygame">
    <Scroll
      :data="newsList"
      :pulldown="pulldown"
      @pulldown="getData"
      :pullup="pullup"
      @scrollToEnd="getMoreData"
    >
      <div v-if="newsList.length === 0" class="tip">暂无报名记录</div>
      <div class="childWrapper">
        <div
          class="newBox"
          v-for="item in newsList"
          :key="item.id"
          @click="toLuck(item.lottery_id, item.type, item.is_type)"
        >
          <div class="title">
            <p>{{ item.title }}</p>
          </div>
          <div class="content">
            <div class="state">
              <p :class="item.color1">{{ item.typename }}</p>
            </div>
            <div class="text">
              <!-- <p>项目编号：{{ item.project }}</p> -->
              <p :class="item.color">{{ item.is_typename }}</p>
              <p>项目地址：{{ item.region }}</p>
              <p class="green">报名时间：{{ item.created_at }}</p>
              <p>失败原因：{{ item.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
import Scroll from '../scroll';
export default {
  name: 'MyGame',
  data() {
    return {
      newsList: [],
      pageIndex: 1,
      pulldown: true,
      pullup: true,
    };
  },
  components: {
    Scroll,
  },
  created() {
    this.getData();
  },
  computed: {},
  mounted() {},

  methods: {
    getData() {
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: '努力加载中', //显示在加载图标下方的加载文案
        spinner: 'el-icon-loading', //自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)', //遮罩层颜色
        target: document.querySelector('#news'), //loadin覆盖的dom元素节点
      });
      this.$request
        .windPost('/api/getmysign', {
          user_id: this.$store.state.loginId,
        })
        .then((res) => {
          let data = res.data;
          // 审核的颜色
          data.forEach((e) => {
            if (e.signuptype === 0) {
              e.color1 = 'red';
            } else if (e.signuptype === 1) {
              e.color1 = 'green';
            } else {
              e.color1 = 'blue';
            }
          });
          this.newsList = data;
          this.pageIndex++;
          loading.close();
        });
    },
    //下拉加载
    getMoreData() {
      this.$request
        .windPost('/api/getmysign', {
          user_id: this.$store.state.loginId,
          page: this.pageIndex,
        })
        .then((res) => {
          let data = res.data.data;
          if (data && data / length > 0) {
            this.pageIndex++;
            // 状态的颜色
            data.forEach((e) => {
              if (e.is_type === 1) {
                e.color = 'grey';
              } else if (e.is_type === 2) {
                e.color = 'green';
              } else if (e.is_type === 3) {
                e.color = 'red';
              } else if (e.is_type === 4) {
                e.color = 'blue';
              } else {
                e.color = 'black';
              }
            });
            // 审核的颜色
            data.forEach((e) => {
              if (e.signuptype === 0) {
                e.color1 = 'red';
              } else if (e.signuptype === 1) {
                e.color1 = 'green';
              } else {
                e.color1 = 'blue';
              }
            });
            this.newsList = this.newsList.concat(data);
          }
        });
    },
    // 前往摇奖界面或详情
    toLuck(id, type, is_type) {
      this.$store.commit('getDetailsId', [id, type]);
      this.$store.commit('getStateType', is_type);
      if (is_type === 4) {
        this.$router.push('/home/luck').catch((err) => {
          console.log(err);
        });
      } else {
        this.$router.push('/home/article').catch((err) => {
          console.log(err);
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
#mygame {
  min-height: calc(100% - 44px);
  background-color: rgb(235, 233, 233);
  padding: 0 4px;
  #scroll {
    height: 92vh;
    .tip {
      text-align: center;
    }
    .childWrapper {
      width: 100%;
      min-height: 92.2vh;
      .newBox {
        position: relative;
        margin-bottom: 10px;
        padding: 10px 20px;
        background-color: #fff;
        .title {
          font-weight: bold;
          margin-bottom: 10px;
        }
        .content {
          display: flex;
          .state {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 24px;
            margin-right: 10px;
            flex: 1.2;
          }
          .text {
            flex: 2.6;
            width: 60%;
            p {
              width: 100%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
          .red {
            color: red;
          }
          .green {
            color: rgb(4, 218, 111);
          }
          .grey {
            color: grey;
          }
          .blue {
            color: #2196f3;
          }
          .black {
            color: #000;
          }
          .btn {
            position: absolute;
            width: 60px;
            font-size: 14px;
            padding: 4px;
            padding: 2px;
            line-height: 20px;
            right: 20px;
            bottom: 10px;
            text-align: center;
            border-radius: 4px;
            color: #fff;
            background-color: #2196f3;
          }
        }
      }
    }
  }
}
</style>
