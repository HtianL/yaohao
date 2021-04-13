<template>
  <div id="gamehistory">
    <Scroll
      :data="list"
      :pulldown="pulldown"
      @pulldown="getData"
      :pullup="pullup"
      @scrollToEnd="getMoreData"
    >
      <div v-if="list.length === 0" class="tip">暂无摇号记录</div>
      <div class="childWrapper">
        <div
          class="newBox"
          v-for="item in list"
          :key="item.id"
          @click="toArticle(item.lottery_id, item.type, item.is_type)"
        >
          <div class="title">
            <p>{{ item.title }}</p>
          </div>
          <div class="content">
            <div class="state"></div>
            <div class="text">
              <p>项目地址：{{ item.region }}</p>
              <p :class="item.color">中奖结果：{{ item.zjend }}</p>
              <p class="green">摇号开始时间：{{ item.ks_time }}</p>
              <p class="red">摇号结束时间：{{ item.js_time }}</p>
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
  name: 'MyGameHistory',
  data() {
    return {
      list: [],
      pageIndex: 1,
      pulldown: true,
      pullup: true,
      title: '',
    };
  },
  components: {
    Scroll,
  },
  created() {
    this.getData();
  },
  mounted() {},

  computed: {},
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
        .windPost('/api/lotteryrecord', {
          user_id: this.$store.state.loginId,
        })
        .then((res) => {
          let data = res.data;
          this.list = data;
          this.pageIndex++;
          loading.close();
        });
    },
    getMoreData() {
      this.$request
        .windPost('/api/lotteryrecord', {
          user_id: this.$store.state.loginId,
          limit: this.pageIndex,
        })
        .then((res) => {
          let data = res.data;
          if (data && data / length > 0) {
            this.pageIndex++;
            // 审核的颜色
            data.forEach((e) => {
              if (e.is_zq === 0) {
                e.color = 'red';
                e.result = '未中签';
              } else if (e.is_zq === 1) {
                e.color = 'green';
                e.result = '中签';
              } else {
                e.color = 'grey';
                e.result = '您未参加摇号';
              }
            });
            this.list = this.list.concat(data);
          }
        });
    },
    back() {
      this.$router.go(-1);
    },
    toArticle(id, type, is_type) {
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
#gamehistory {
  width: 100%;
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
          .time {
            color: rgb(136, 135, 135);
          }
          .red {
            color: red;
          }
          .green {
            color: rgb(4, 218, 111);
          }
          .blue {
            color: #2196f3;
          }
          .grey {
            color: #666;
          }
          // .btn {
          //   position: absolute;
          //   width: 60px;
          //   line-height: 20px;
          //   right: 20px;
          //   bottom: 10px;
          //   text-align: center;
          //   border-radius: 4px;
          //   color: #fff;
          //   background-color: #2196f3;
          // }
        }
      }
    }
  }
}
</style>
