<template>
  <div id="Search">
    <div class="head">
      <div class="search">
        <mu-auto-complete
          :data="list"
          label="搜索"
          :max-search-results="5"
          :label-float="true"
          v-model="value"
          @select="fliterNews"
        ></mu-auto-complete>
        <i class="iconfont icon-sousuo" @click="search"></i>
      </div>
      <div class="back" @click="back">
        <p>取消</p>
      </div>
    </div>
    <div class="searchList">
      <div
        class="newBox"
        v-for="item in newsList"
        :key="item.id"
        @click="toArticle(item.lottery_id, item.is_type, item.type)"
      >
        <div class="title">
          <p>{{ item.title }}</p>
        </div>
        <div class="content">
          <div class="state">
            <p>状态：</p>
            <p :class="item.color">{{ item.is_typename }}</p>
          </div>
          <div class="text">
            <p>项目编号：{{ item.project }}</p>
            <p class="green">开始时间：{{ item.ks_time }}</p>
            <p class="red">截止时间：{{ item.js_time }}</p>
            <p>项目地址：{{ item.region }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      list: [
        "报名未开始",
        "报名中",
        "报名结束",
        "摇号中",
        "摇号结束",
        "结果公示",
        "已完结"
      ],
      value: null,
      index: "",
      newsList: []
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    fliterNews(value) {
      console.log(value);
    },
    search() {
      this.isSearch = true;
      this.tagValue(this.value);
      console.log(this.index);
      if (this.index === "") {
        this.$request
          .windPost("/api/getlottery", {
            title: this.value
          })
          .then(res => {
            let data = res.data.data;
            if (data.length !== "") {
              data.forEach(e => {
                if (e.is_type === 1 || e.is_type === 6 || e.is_type === 7) {
                  e.color = "grey";
                } else if (e.is_type === 2 || e.is_type === 4) {
                  e.color = "green";
                } else {
                  e.color = "red";
                }
              });
              this.newsList = data;
            }
          });
      } else {
        this.$request
          .windPost("/api/getlottery", {
            is_type: this.index
          })
          .then(res => {
            let data = res.data.data;
            if (data.length !== "") {
              data.forEach(e => {
                if (e.is_type === 1 || e.is_type === 6 || e.is_type === 7) {
                  e.color = "grey";
                } else if (e.is_type === 2 || e.is_type === 4) {
                  e.color = "green";
                } else {
                  e.color = "red";
                }
              });
              this.newsList = data;
            }
          });
      }
    },
    tagValue(value) {
      this.index = "";
      switch (value) {
        case "报名未开始":
          this.index = 1;
          break;
        case "报名中":
          this.index = 2;
          break;
        case "报名结束":
          this.index = 3;
          break;
        case "摇号中":
          this.index = 4;
          break;
        case "摇号结束":
          this.index = 5;
          break;
        case "结果公示":
          this.index = 6;
          break;
        case "已完结":
          this.index = 7;
          break;
      }
    },
    back() {
      this.$router.go(-1);
    },
    toArticle(id, is_type, type) {
      this.$store.commit("getDetailsId", [id, type]);
      if (is_type === 4) {
        this.$router.push("/home/luck").catch(err => {
          console.log(err);
        });
      } else {
        this.$router.push("/home/article").catch(err => {
          console.log(err);
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
#Search {
  width: 100%;
  height: 100%;
  background-color: rgb(235, 233, 233);
  .head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .back {
      p {
        font-size: 16px;
        color: rgb(160, 159, 159, 0.6);
      }
    }
  }
  .searchList {
    overflow: auto;
    width: 100%;
    height: 80vh;
    padding: 10px;
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
        justify-content: start;
        .state {
          width: 104px;
          font-size: 26px;
          margin-right: 10px;
        }
        .text {
          line-height: 26px;
          margin-top: -28px;
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
</style>
