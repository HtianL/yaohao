<template>
  <div id="choicePrize">
    <Scroll
      :data="list"
      :pulldown="pulldown"
      @pulldown="getData"
      :pullup="pullup"
      @scrollToEnd="getMoreData"
    >
      <div class="childWrapper">
        <div class="newBox" v-for="(item, index) in list" :key="item.id">
          <div class="title">
            <p>{{ item.name }}</p>
          </div>
          <mu-checkbox
            v-model="check[index]"
            :value="item.id"
            label="选择"
            :disabled="isDisabled[index]"
            @change="getHouseId(item.id, check[index], index, item.square)"
          ></mu-checkbox>
          <div class="content">
            <div class="text">
              <p>剩余数量:{{ item.number }}</p>
              <p>房屋面积：{{ item.square }}</p>
            </div>
            <p class="instructions">标的简介：{{ item.instructions }}</p>
          </div>
        </div>
      </div>
    </Scroll>
    <!-- 选择前的确认弹框 -->
    <mu-dialog title="确认选择" width="360" :open.sync="openSimple">
      确认选择此标的？
      <mu-button slot="actions" flat color="primary" @click="close('取消')"
        >取消</mu-button
      >
      <mu-button slot="actions" flat color="primary" @click="close('确认')"
        >确定</mu-button
      >
    </mu-dialog>
    <!-- 选择结果弹框 -->
    <mu-dialog title="选择结果" width="360" :open.sync="openResult">
      {{ message }}
      <mu-button slot="actions" flat color="primary" @click="closeResult"
        >确定</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
import Scroll from '../scroll';
export default {
  name: 'ChoicePrize',
  data() {
    return {
      list: [],
      pulldown: true,
      pullup: true,
      openSimple: false,
      openResult: false,
      check: [],
      isDisabled: [],
      message: '',
      houseId: '',
      square: '', //用户剩余面积数
      choiceSquare: '',
      index: 0,
    };
  },
  components: {
    Scroll,
  },
  created() {
    this.getSquera();
  },
  computed: {},
  methods: {
    //获取房屋面积平方
    getSquera() {
      this.$request
        .windPost('/api/getsquare', {
          user_id: this.$store.state.loginId,
          lottery_id: this.$store.state.detailsId[0],
        })
        .then((res) => {
          this.square = res.square;
          this.getData();
        });
    },
    //获取列表数据
    getData() {
      this.$request
        .windPost('/api/gettwosubject', {
          lottery_id: this.$store.state.detailsId[0],
        })
        .then((res) => {
          if (res.code === 1) {
            let data = res.data;
            data.forEach((d, index) => {
              //房屋数量为0或者剩余面积不足
              if (d.number === 0 || Number(this.square) < Number(d.square)) {
                this.isDisabled[index] = true;
              }
            });
            this.list = res.data;
          }
        });
    },
    getMoreData() {},
    // 获取房屋id
    getHouseId(value, checkbox, index, square) {
      if (checkbox) {
        this.openSimple = true;
        this.houseId = value;
        this.index = index;
        this.choiceSquare = square;
      }
    },
    // 关闭抽奖前的确认方法  链接选择接口
    close(data) {
      this.openSimple = false;
      if (data === '确认') {
        this.$request
          .windPost('/api/gettwoend', {
            user_id: this.$store.state.loginId, //42
            lottery_id: this.$store.state.detailsId[0],
            subject_id: this.houseId,
          })
          .then((res) => {
            if (res.code === 1) {
              this.openResult = true;
              let length = res.makeup.length;
              if (length) {
                this.square = res.makeup[length - 1].square;
              } else {
                this.square = this.square - this.choiceSquare;
              }
              this.message =
                '恭喜您选择成功,您还剩余' + this.square + '平方米可供选择';
            } else {
              this.openResult = true;
              this.getDifferentTime(res.ks_time);
              this.message = this.message + res.msg;
            }
          });
      } else {
        this.check[this.index] = false;
      }
    },
    // 关闭中奖结果接口  刷新页面
    closeResult() {
      this.openResult = false;
      this.check[this.index] = false;
      this.getData();
    },
    getDifferentTime(time) {
      let diff = (new Date(time) - new Date()) / 1000;
      let minutes = parseInt((diff % 3600) / 60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
      let seconds = parseInt(diff % 60);
      this.message = '距您抽奖还有' + minutes + '分' + seconds + '秒';
    },
  },
};
</script>
<style lang="less" scoped>
#choicePrize {
  min-height: calc(100% - 44px);
  padding: 10px 4px;
  background-color: rgb(235, 233, 233);
  .childWrapper {
    width: 100%;
    min-height: 84.1vh;
    .newBox {
      position: relative;
      margin-bottom: 10px;
      padding: 10px 20px;
      background-color: #fff;
      .title {
        font-weight: bold;
        margin-bottom: 4px;
      }
      .mu-checkbox {
        position: absolute;
        right: 20px;
        top: 10px;
      }
      .content {
        display: flex;
        justify-content: start;
        .text {
          width: 150px;
          line-height: 26px;
        }
        .instructions {
          max-width: 224px;
          margin-left: 10px;
        }
        .time {
          color: rgb(136, 135, 135);
        }
      }
    }
  }
}
</style>
