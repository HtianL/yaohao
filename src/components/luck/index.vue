<template>
  <div id="luck">
    <div class="luckTimes">
      <p>您可摇号</p>
      <span class="times">{{ times }}</span
      ><span>次</span>
    </div>
    <div class="niu_danji">
      <!--机器-->
      <div class="game_qu">
        <!--go-->
        <div class="game_go" @click="start">
          <img src="../../assets/images/an_go.png" alt="" />
        </div>
        <img src="../../assets/images/game_ndj.png" alt="" />
      </div>

      <!--球-->
      <div class="dan_gund">
        <div :class="[index ? animation[0] : 'diaol_1', 'qiu_1']">
          <img src="../../assets/images/canpin_4.png" alt="" />
        </div>
        <div :class="[index ? animation[1] : 'diaol_2', 'qiu_2']">
          <img src="../../assets/images/canpin_1.png" alt="" />
        </div>
        <div :class="[index ? animation[2] : 'diaol_3', 'qiu_3']">
          <img src="../../assets/images/canpin_2.png" alt="" />
        </div>
        <div :class="[index ? animation[3] : 'diaol_4', 'qiu_4']">
          <img src="../../assets/images/canpin_3.png" alt="" />
        </div>
        <div :class="[index ? animation[4] : 'diaol_5', 'qiu_5']">
          <img src="../../assets/images/canpin_4.png" alt="" />
        </div>
        <div :class="[index ? animation[5] : 'diaol_6', 'qiu_6']">
          <img src="../../assets/images/canpin_2.png" alt="" />
        </div>
        <div :class="[index ? animation[6] : 'diaol_7', 'qiu_7']">
          <img src="../../assets/images/canpin_1.png" alt="" />
        </div>
        <div :class="[index ? animation[7] : 'diaol_8', 'qiu_8']">
          <img src="../../assets/images/canpin_3.png" alt="" />
        </div>
        <div :class="[index ? animation[8] : 'diaol_9', 'qiu_9']">
          <img src="../../assets/images/canpin_2.png" alt="" />
        </div>
        <div :class="[index ? animation[9] : 'diaol_10', 'qiu_10']">
          <img src="../../assets/images/canpin_1.png" alt="" />
        </div>
        <div :class="[index ? animation[10] : 'diaol_11', 'qiu_11']">
          <img src="../../assets/images/canpin_3.png" alt="" />
        </div>
      </div>

      <!--中奖掉落-->
      <div class="medon"><img src="../../assets/images/mendong.png" /></div>
      <div class="zjdl" :class="fallDown">
        <span :class="winPrize"></span>
      </div>
    </div>

    <!--中奖-->
    <div class="zonj_zezc none" id="jianpin_one" v-if="jianpin">
      <div class="jpzs aiqiyi tc_anima">
        <em @click="close"><img src="../../assets/images/close.png"/></em>
        <h2>
          <b>{{ result }}</b>
        </h2>
      </div>
    </div>
    <div class="userResult">
      <p v-for="(item, index) in resultList" :key="item.id">
        结果{{ index + 1 }} {{ item.result }}
      </p>
    </div>
  </div>
</template>
<script>
import '../../luckCss/index.css';
export default {
  name: 'Luck',
  data() {
    return {
      animation: [
        'wieyi_1',
        'wieyi_2',
        'wieyi_3',
        'wieyi_4',
        'wieyi_5',
        'wieyi_6',
        'wieyi_7',
        'wieyi_8',
        'wieyi_9',
        'wieyi_10',
        'wieyi_11',
      ],
      winPrize: '', //获奖的球
      fallDown: '', //掉落的球
      index: false,
      jianpin: false, //中将页面
      showPrizeList: false, //展示跳转中奖页面按钮
      result: '',
      resultList: '',
      times: '',
      canDraw: false,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    //多对多动画
    toList() {
      this.$router.push('/home/lucklist').catch((err) => {
        console.log(err);
      });
    },
    //一对一抽奖动画
    closePrize() {
      this.openPrize = false;
    },
    //开启抽奖动画
    start() {
      if (!this.canDraw) {
        this.draw();
      } else {
        if (typeof this.result === Array) {
          this.result = '请勿重复抽号';
        }
        this.jianpin = true;
      }
    },
    draw() {
      this.canDraw = true;
      var number = Math.floor(4 * Math.random() + 1);
      this.index = true;
      setTimeout(
        function() {
          this.index = false;
        }.bind(this),
        1100
      );
      setTimeout(
        function() {
          switch (number) {
            case 1:
              this.winPrize = 'diaL_one';
              break;
            case 2:
              this.winPrize = 'diaL_two';
              break;
            case 3:
              this.winPrize = 'diaL_three';
              break;
            case 4:
              this.winPrize = 'diaL_four';
              break;
          }
          this.fallDown = 'dila_Y';
          setTimeout(function() {
            switch (number) {
              case 1:
                this.jianpin_one = true;
                break;
              case 2:
                this.jianpin_two = true;
                break;
              case 3:
                this.jianpin_three = true;
                break;
              case 4:
                this.jianpin_four = true;
                break;
            }
          }, 900);
        }.bind(this),
        1100
      );

      //取消动画
      setTimeout(
        function() {
          this.winPrize = '';
          this.fallDown = '';
          if (this.$store.state.detailsId[1] === 2) {
            if (this.$store.state.times === 1) {
              this.getResult1();
            } else if (this.$store.state.times === 2) {
              this.getResult2();
            } else {
              this.$router.push('/home/choicePrize').catch((err) => {
                console.log(err);
              });
            }
            this.beforeShake();
          } else {
            this.getResult();
          }
        }.bind(this),
        2400
      );
    },
    //抽奖方法
    getResult() {
      this.$request
        .windPost('/api/getoneend', {
          user_id: this.$store.state.loginId,
          lottery_id: this.$store.state.detailsId[0],
        })
        .then((res) => {
          this.result = res.data !== null ? res.data[0].zjname : res.msg;
          this.jianpin = true;
        });
    },
    //顺序摇号
    //第一次摇号
    getResult1() {
      this.$request
        .windPost('/api/gettwoend', {
          user_id: this.$store.state.loginId,
          lottery_id: this.$store.state.detailsId[0],
        })
        .then((res) => {
          if (res.code === 1) {
            this.result = `您的抽奖顺序为 \n ${res.data.location}`;
          } else {
            this.result = res.msg;
          }
          this.jianpin = true;
        });
    },
    getResult2() {
      if (this.$store.state.secondType === 1) {
        this.$request
          .windPost('/api/gettwosubject', {
            user_id: this.$store.state.loginId,
            lottery_id: this.$store.state.detailsId[0],
          })
          .then((res) => {
            if (res.code === 1) {
              this.result = `恭喜您获得${res.data.name} \n 您还剩余${res.makeup[0].square}没抽`;
            } else {
              this.result = res.msg;
            }
            this.jianpin = true;
          });
      } else {
        this.$request
          .windPost('/api/gettwosubject', {
            user_id: this.$store.state.loginId,
            lottery_id: this.$store.state.detailsId[0],
          })
          .then((res) => {
            if (res.code === 1) {
              this.result = `您的抽奖顺序为 \n ${res.data.location}`;
            } else {
              this.result = res.msg;
            }
            this.jianpin = true;
          });
      }
    },
    close() {
      this.jianpin = false;
    },
    beforeShake() {
      this.$request
        .windPost('/api/gettwoend', {
          user_id: this.$store.state.loginId,
          lottery_id: this.$store.state.detailsId[0],
        })
        .then((res) => {
          if (res.code === 1) {
            this.resultList = res.data;
            this.times = res.count;
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
#luck {
  width: 100%;
  height: calc(100% - 40px);
  color: #fff;
  .luckTimes {
    position: absolute;
    top: 50px;
    left: 10px;
    z-index: 2;
    text-align: center;
    .times {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .niu_danji {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #1b1009;
    .game_qu {
      position: absolute;
      width: 300px;
      height: 438px;
      left: 50%;
      top: 80px;
      margin-left: -150px;
      z-index: 3;
      .game_go {
        position: absolute;
        width: 30%;
        height: 22%;
        left: 35%;
        top: 50%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .dan_gund {
      overflow: hidden;
      position: absolute;
      width: 274px;
      height: 288px;
      left: 50%;
      margin-left: -138px;
      top: 46px;
      z-index: 1;
      div {
        position: absolute;
        img {
          width: 50px;
          height: 50px;
          animation: zhuan 1s linear forwards;
          -webkit-animation: zhuan 1s linear forwards;
        }
      }
      .qiu_1 {
        left: 24px;
        top: 196px;
      }
      .qiu_2 {
        left: 0px;
        top: 152px;
      }
      .qiu_3 {
        left: 0px;
        top: 238px;
      }
      .qiu_4 {
        left: 50px;
        top: 238px;
      }
      .qiu_5 {
        left: 90px;
        top: 208px;
      }
      .qiu_6 {
        left: 62px;
        top: 166px;
      }
      .qiu_7 {
        left: 126px;
        top: 176px;
      }
      .qiu_8 {
        left: 154px;
        top: 216px;
      }
      .qiu_9 {
        left: 178px;
        top: 172px;
      }
      .qiu_10 {
        left: 198px;
        top: 238px;
      }
      .qiu_11 {
        left: 222px;
        top: 194px;
      }
    }
    .dila_Y {
      width: 54px;
      height: 54px;
      animation: cujpin 0.7s ease-out forwards;
      -webkit-animation: cujpin 0.7s ease-out forwards;
    }
    .zjdl {
      position: absolute;
      width: 80px;
      height: 78px;
      left: 50%;
      margin-left: -40px;
      top: 450px;
      z-index: 2;
      span {
        width: 50px;
        height: 50px;
        position: relative;
      }
      span:after {
        content: '';
        position: absolute;
        left: 13px;
        top: 16px;
        width: 54px;
        height: 54px;
        display: block;
        animation: fanda 0.7s ease-out forwards;
        -webkit-animation: fanda 0.7s ease-out forwards;
      }
      .diaL_one:after {
        background: url(../../assets/images/canpin_1.png) no-repeat;
        background-size: cover;
      }
      .diaL_two:after {
        background: url(../../assets/images/canpin_2.png) no-repeat;
        background-size: cover;
      }
      .diaL_three:after {
        background: url(../../assets/images/canpin_3.png) no-repeat;
        background-size: cover;
      }
      .diaL_four:after {
        background: url(../../assets/images/canpin_4.png) no-repeat;
        background-size: cover;
      }
    }
    .medon {
      position: absolute;
      width: 74px;
      height: 68px;
      left: 50%;
      margin-left: -38px;
      top: 451px;
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .userResult {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 2;
  }
}
</style>
