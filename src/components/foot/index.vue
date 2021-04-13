<template>
  <div id="foot">
    <mu-bottom-nav :value="navValue">
      <mu-bottom-nav-item
        title="公告信息"
        icon=":iconfont icon-xinxi"
        value="/home/news"
        to="/home/news"
      ></mu-bottom-nav-item>
      <mu-bottom-nav-item
        title="我的"
        icon=":iconfont icon-wode"
        value="/home/user"
        to="/home/user"
      ></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>
<script>
export default {
  name: "Foot",
  data() {
    return {
      navValue: ""
    };
  },
  created() {},
  mounted() {
    this.navValue = this.$route.path;
  },
  computed: {},
  watch: {
    $route(val) {
      this.navValue = val.path;
    }
  },
  methods: {}
};
</script>
<style lang="less" scoped>
#foot {
  .mu-bottom-nav {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    font-size: 16px;
  }
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>
