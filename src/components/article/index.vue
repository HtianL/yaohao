<template>
  <div id="article">
    <div>
      <h2 :class="color">{{ state }}</h2>
      <h2>{{ title }}</h2>
      <div class="content" ref="content"></div>
    </div>
    <div class="foot">
      <div class="foot1" v-if="type === 2 && $store.state.detailsId[1] === 1">
        <mu-button color="primary" @click="enlist">摇号报名</mu-button>
      </div>
      <div class="foot2" v-if="type === 6">
        <mu-button @click="toList()" color="primary">中奖名单</mu-button>
      </div>
    </div>
    <div class="ask blue">
      <p @click="toHelpCenter()" color="primary">用户提问</p>
      <a :href="url" download class="blue">附件下载</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Article',
  data() {
    return {
      title: '',
      content: '',
      type: '',
      state: '',
      color: '',
      url: '',
    };
  },
  created() {
    this.getDetails();
  },
  mounted() {},
  computed: {},
  methods: {
    getDetails() {
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: '努力加载中', //显示在加载图标下方的加载文案
        spinner: 'el-icon-loading', //自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.7)', //遮罩层颜色
        target: document.querySelector('#news'), //loadin覆盖的dom元素节点
      });
      if (this.$store.state.detailsId[1] === 1) {
        this.$request
          .windPost('/api/getlotterygetails', {
            lottery_id: this.$store.state.detailsId[0],
          })
          .then((res) => {
            let data = res.data[0];
            this.title = data.title;
            this.type = data.is_type;
            this.url = data.attachment;
            this.addContent(data);
            this.status();
            this.$refs.content.innerHTML = this.content;
            loading.close();
          });
      } else {
        this.$request
          .windPost('/api/getorderlotterygetails', {
            id: this.$store.state.detailsId[0],
          })
          .then((res) => {
            let data = res.data[0];
            this.title = data.title;
            this.type = data.is_type;
            this.$store.commit('getSecondType', data.one_type);
            this.addContent(data);
            this.status();
            this.$refs.content.innerHTML = this.content;
            loading.close();
          });
      }
    },
    enlist() {
      if (this.$store.state.loginId) {
        this.$router.push('/home/signup').catch((err) => {
          console.log(err);
        });
      } else {
        this.$router.push('/home/login').catch((err) => {
          console.log(err);
        });
      }
    },
    enlistDownload() {
      window.open = this.attachment;
    },
    toList() {
      this.$router.push('/home/lucklist').catch((err) => {
        console.log(err);
      });
    },
    toHelpCenter() {
      this.$router.push('/home/helpcenter').catch((err) => {
        console.log(err);
      });
    },
    addContent(data) {
      if (this.type === 1 || this.type === 2 || this.type === 3) {
        this.content = `
              <div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">报名公告</h2>${data.announcement}</div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">报名须知</h2>${data.instructions}</div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">报名开始时间</h2>${data.signupkstime}</div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">报名结束时间</h2>${data.signupjstime}</div>
              </div>
          `;
      } else if (this.type === 4 || this.type === 5) {
        this.content = `
              <div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">摇号公告</h2>${data.announcement}</div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">摇号须知</h2>${data.instructions}</div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">摇号开始时间</h2>${data.ystart_time}</div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">摇号结束时间</h2>${data.yend_time}</div>
              </div>
          `;
      } else {
        this.content = `
              <div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">公告</h2>${data.announcement}</div>
                <div style="margin-top:20px;"><h2 style="margin-bottom:20px;">须知</h2>${data.instructions}</div>
              </div>
          `;
      }
    },
    status() {
      switch (this.type) {
        case 1:
          this.state = '报名未开始';
          this.color = 'grey';
          break;
        case 2:
          this.state = '报名中';
          this.color = 'green';
          break;
        case 3:
          this.state = '报名结束';
          this.color = 'red';
          break;
        case 4:
          this.state = '摇号中';
          this.color = 'green';
          break;
        case 5:
          this.state = '摇号结束 ';
          this.color = 'red';
          break;
        case 6:
          this.state = '结果公示';
          this.color = 'grey';
          break;
        case 7:
          this.state = '已完结';
          this.color = 'grey';
          break;
      }
    },
  },
};
</script>
<style lang="less" scoped>
#article {
  position: relative;
  min-height: calc(100% - 60px);
  padding: 20px;
  img {
    width: 100%;
    max-height: 240px;
    margin-bottom: 10px;
    border: 1px solid grey;
  }
  h2 {
    width: 100%;
    word-wrap: break-word;
    text-align: center;
  }
  .content {
    width: 100%;
    min-height: 200px;
    line-height: 26px;
    word-wrap: break-word;
    word-break: break-all;
    font-weight: 400;
  }
  .foot {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  .ask {
    display: flex;
    justify-content: start;
    margin-top: 10px;
    font-size: 12px;
    p {
      margin-right: 10px;
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
}
</style>
