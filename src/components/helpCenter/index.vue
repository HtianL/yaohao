<template>
  <div id="helpCenter">
    <Scroll
      :data="list"
      :pulldown="pulldown"
      @pulldown="getData"
      :pullup="pullup"
    >
      <div class="childWrapper">
        <div
          class="newBox"
          v-for="item in list"
          :key="item.id"
          @touchstart="gotouchstart"
          @touchmove="gotouchmove"
          @touchend="gotouchend(item.q, item.id)"
        >
          <div class="question">
            <span class="red">问</span>
            <p>{{ item.q }}</p>
          </div>
          <div class="answer">
            <span class="green">答</span>
            <p>{{ item.back }}</p>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="ask">
      <textarea placeholder="点击此处开始提问" v-model="value" rows="3" />
      <p @click="ask">{{ askBtn }}</p>
    </div>
    <mu-dialog title="提示" width="360" :open.sync="openTip">
      确认要修改次问答？
      <mu-button slot="actions" flat color="primary" @click="cancelTip"
        >取消</mu-button
      >
      <mu-button slot="actions" flat color="primary" @click="sureTip"
        >确定</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
import Scroll from '../scroll';
export default {
  name: 'HelpCenter',
  data() {
    return {
      pulldown: true,
      pullup: true,
      list: [],
      value: '',
      qId: '',
      endValue: [],
      askBtn: '提问',
      timeOutEvent: 0,
      openTip: false,
    };
  },
  components: {
    Scroll,
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    getData() {
      this.$request
        .windPost('/api/getquestion', {
          user_id: this.$store.state.loginId,
          summary_id: this.$store.state.summaryId,
        })
        .then((res) => {
          if (res.code === 1) {
            this.list = res.data.data;
          }
        });
    },
    ask() {
      if (this.askBtn === '提问') {
        this.$request
          .windPost('/api/savequestion', {
            user_id: this.$store.state.loginId,
            summary_id: this.$store.state.summaryId,
            q: this.value,
          })
          .then((res) => {
            if (res.code === 1) {
              this.value = '';
              this.getData();
            }
          });
      } else {
        this.$request
          .windPost('/api/savemyquestion', {
            q: this.value,
            reply_id: this.qId,
          })
          .then((res) => {
            if (res.code === 1) {
              this.value = '';
              this.getData();
            }
          });
      }
    },
    // 长按事件模拟
    gotouchstart() {
      let that = this;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(function() {
        //执行长按要执行的内容，
      }, 1000); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend(value, id) {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
        this.openTip = true;
        this.endValue[0] = value;
        this.endValue[1] = id;
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
    cancelTip() {
      this.openTip = false;
    },
    sureTip() {
      this.openTip = false;
      this.askBtn = '修改';
      this.value = this.endValue[0];
      this.qId = this.endValue[1];
    },
  },
};
</script>
<style lang="less" scoped>
#helpCenter {
  min-height: calc(100% - 44px);
  background-color: rgb(235, 233, 233);
  padding: 10px 4px;
  #scroll {
    height: 80vh;
    .childWrapper {
      width: 100%;
      min-height: 80.2vh;
      .newBox {
        position: relative;
        margin-bottom: 10px;
        padding: 10px 20px;
        border-radius: 10px;
        background-color: #fff;
        span {
          display: inline-block;
          width: 26px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          border-radius: 4px;
          color: #fff;
          margin-right: 6px;
        }
        p {
          display: inline-block;
        }
        .red {
          background-color: rgb(233, 57, 57);
        }
        .green {
          background-color: rgb(63, 226, 76);
        }
        .question {
          margin-bottom: 10px;
          p {
            font-weight: bold;
          }
        }
      }
    }
  }
  .ask {
    display: flex;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    textarea {
      flex: 3;
      &:focus {
        outline-color: #2196f3;
      }
    }
    p {
      flex: 1;
      line-height: 78px;
      text-align: center;
      color: #fff;
      background-color: #2196f3;
      margin-left: 4px;
      border-radius: 4px;
    }
  }
}
</style>
