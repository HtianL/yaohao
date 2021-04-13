<template>
  <div id="news">
    <Scroll
      :data="newsList"
      :pulldown="pulldown"
      @pulldown="getNews"
      :pullup="pullup"
      @scrollToEnd="getMoreNews"
    >
      <div class="childWrapper">
        <div
          class="newBox"
          v-for="item in newsList"
          :key="item.id"
          @click="
            toArticle(
              item.lottery_id,
              item.is_type,
              item.type,
              item.times,
              item.id,
              item.one_type
            )
          "
        >
          <div class="title">
            <p>{{ item.title }}</p>
          </div>
          <div class="content">
            <div class="state">
              <p :class="item.color">{{ item.is_typename }}</p>
            </div>
            <div class="text">
              <!-- <p>项目编号：{{ item.project }}</p> -->
              <p class="green">开始时间：{{ item.ks_time }}</p>
              <p class="red">截止时间：{{ item.js_time }}</p>
              <p>项目地址：{{ item.region }}</p>
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
  name: 'News',
  data() {
    return {
      newsList: [],
      pulldown: true,
      pullup: true,
      pageIndex: 1,
    };
  },
  components: {
    Scroll,
  },
  created() {
    this.getNews();
  },
  mounted() {},
  computed: {},
  methods: {
    getNews() {
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: '努力加载中', //显示在加载图标下方的加载文案
        spinner: 'el-icon-loading', //自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)', //遮罩层颜色
        target: document.querySelector('#news'), //loadin覆盖的dom元素节点
      });
      this.$request
        .windPost('api/getlottery', {
          limit: 5,
          page: 1,
        })
        .then((res) => {
          if (res.code === 1) {
            let data = res.data.data;
            data.forEach((e) => {
              if (e.is_type === 1 || e.is_type === 6 || e.is_type === 7) {
                e.color = 'grey';
              } else if (e.is_type === 2 || e.is_type === 4) {
                e.color = 'green';
              } else {
                e.color = 'red';
              }
            });
            this.newsList = data;
            this.pageIndex++;
            loading.close();
          }
        });
    },
    getMoreNews() {
      this.$request
        .windPost('api/getlottery', {
          limit: 5,
          page: this.pageIndex,
        })
        .then((res) => {
          let data = res.data.data;
          if (data && data.length > 0) {
            this.pageIndex++;
            data.forEach((e) => {
              if (e.is_type === 1 || e.is_type === 6 || e.is_type === 7) {
                e.color = 'grey';
              } else if (e.is_type === 2 || e.is_type === 4) {
                e.color = 'green';
              } else {
                e.color = 'red';
              }
            });
            this.newsList = this.newsList.concat(data);
          }
        });
    },
    toArticle(id, is_type, type, times, id1, one_type) {
      this.$store.commit('getDetailsId', [id, type]);
      this.$store.commit('getStateType', is_type);
      this.$store.commit('getTimes', times);
      this.$store.commit('getId', id1);
      this.$store.commit('getSecondType', one_type);
      if (is_type === 4 && times !== 3) {
        this.$router.push('/home/luck').catch((err) => {
          console.log(err);
        });
      } else if (times === 3) {
        this.$router.push('/home/choiceprize').catch((err) => {
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
#news {
  min-height: calc(100% - 100px);
  padding: 0 4px;
  background-color: rgb(235, 233, 233);
  #scroll {
    height: 84.5vh;
    .childWrapper {
      width: 100%;
      min-height: 84.6vh;
      .newBox {
        position: relative;
        margin-bottom: 10px;
        padding: 10px 20px;
        background-color: #fff;
        .title {
          font-weight: bold;
          margin-bottom: 4px;
        }
        .content {
          display: flex;
          align-items: center;
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
          .grey {
            color: grey;
          }
          .btn {
            position: absolute;
            font-size: 14px;
            padding: 4px;
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
