<template>
  <div id="home">
    <Head />
    <router-view class="homeBody" />
    <Foot v-if="showFoot" />
  </div>
</template>

<script>
import Head from '../components/head';
import Foot from '../components/foot';
export default {
  name: 'Home',
  components: {
    Head,
    Foot,
  },
  data() {
    return {
      showFoot: true,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {
    $route(val) {
      if (val.path == '/home/news' || val.path == '/home/user') {
        this.showFoot = true;
      } else {
        this.showFoot = false;
      }
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
#home {
  width: 100%;
  height: 100%;
  .homeBody {
    border-radius: 4px;
  }
}
</style>
