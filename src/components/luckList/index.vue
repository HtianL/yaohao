<template>
  <div id="luckList">
    <Scroll
      :data="luckList"
      :pulldown="pulldown"
      @pulldown="getData"
      :pullup="pullup"
      @scrollToEnd="getMoreData"
    >
      <div class="childWrapper">
        <div class="newBox" v-for="item in luckList" :key="item.id">
          <div class="title">
            <p>{{ item.title }}</p>
          </div>
          <div class="content">
            <div class="text">
              <p>姓名：{{ item.name }}</p>
              <p class="time">手机：{{ item.mobile }}</p>
              <p>身份证：{{ item.certificate }}</p>
              <p>摇号结果：{{ item.subjectname }}</p>
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
  data() {
    return {
      luckList: [],
      pageIndex: 1,
      pulldown: true,
      pullup: true,
      isAll: false,
    };
  },
  components: {
    Scroll,
  },
  created() {
    if (this.$store.state.stateType === 4) {
      this.getData();
    } else {
      this.getAllData();
    }
  },
  mounted() {},
  computed: {},
  methods: {
    //获取个人结果
    getData() {
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: '努力加载中', //显示在加载图标下方的加载文案
        spinner: 'el-icon-loading', //自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)', //遮罩层颜色
        target: document.querySelector('#news'), //loadin覆盖的dom元素节点
      });
      this.$request
        .windPost('/api/getoneend', {
          user_id: this.$store.state.loginId,
          lottery_id: this.$store.state.detailsId[0],
        })
        .then((res) => {
          if (res.code === 1) {
            this.luckList = res.data;
            loading.close();
          }
        });
    },
    //获取全部人的结果
    getAllData() {
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: 'Loading', //显示在加载图标下方的加载文案
        spinner: 'el-icon-loading', //自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)', //遮罩层颜色
        target: document.querySelector('#news'), //loadin覆盖的dom元素节点
      });
      this.$request
        .windPost('/api/getlotteryend', {
          summary_id: this.$store.state.summaryId,
        })
        .then((res) => {
          if (res.code === 1) {
            this.luckList = res.data;
            this.isAll = true;
            loading.close();
          }
        });
    },
    getMoreData() {
      if (this.$store.state.stateType === 6) {
        this.$request
          .windPost('/api/getlotteryend', {
            summary_id: this.$store.state.summaryId,
          })
          .then((res) => {
            if (res.code === 1) {
              let data = res.data;
              if (data && data / length > 0) {
                this.pageIndex++;
                this.luckList = this.luckList.concat(data);
              }
            }
          });
      }
    },
  },
};
</script>
<style lang="less" scoped>
#luckList {
  width: 100%;
  min-height: calc(100% - 44px);
  background-color: rgb(235, 233, 233);
  padding: 0 4px;
  #scroll {
    height: 92vh;
    .childWrapper {
      width: 100%;
      min-height: 92.1vh;
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
          justify-content: start;
          align-items: center;
          p {
            max-width: 300px;
            line-height: 26px;
            word-break: break-all;
          }
          .img {
            width: 34%;
            margin-right: 10px;
          }
          img {
            width: 100%;
            height: 100px;
          }
        }
      }
    }
  }
}
</style>
