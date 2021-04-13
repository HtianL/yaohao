<template>
  <div id="head">
    <div class="back">
      <img
        src="../../assets/back.png"
        alt=""
        v-if="
          this.$route.path !== '/home/news' && this.$route.path !== '/home/user'
        "
        @click="back"
      />
    </div>
    <div class="title">{{ title }}</div>
    <div class="user" @click="toSearch">
      <img
        src="../../assets/search.png"
        alt=""
        v-show="this.$route.path == '/home/news'"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '公告信息',
    };
  },
  created() {},
  computed: {},
  watch: {
    $route(val) {
      this.title = val.meta.title;
    },
  },
  methods: {
    toSearch() {
      this.$router.push('/search').catch((err) => {
        console.log(err);
      });
    },
    back() {
      this.$router.back(-1);
    },
  },
};
</script>
<style lang="less" scoped>
#head {
  display: flex;
  width: 100%;
  line-height: 20px;
  justify-content: space-between;
  font-size: 16px;
  padding: 10px;
  color: #fff;
  background-color: #2196f3;
  .back {
    width: 20px;
    height: 20px;
  }
  img {
    width: 20px;
    height: 20px;
  }
  .user {
    width: 20px;
    height: 20px;
  }
}
</style>
