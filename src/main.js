import icon from './assets/font/iconfont.css';
import 'lib-flexible/flexible';
import 'muse-ui-progress/dist/muse-ui-progress.css';
import 'muse-ui/dist/muse-ui.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import request from './request';
import MuseUI from 'muse-ui';
import { Upload, Loading, Message } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import 'muse-ui/lib/styles/theme.less';
Vue.use(MuseUI);
Vue.use(icon);
Vue.use(Upload);
Vue.use(Loading);
Vue.component(Message);
Vue.config.productionTip = false;
Vue.prototype.$request = request;
Vue.prototype.$message = Message;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  window.addEventListener('load', () => {
    next({
      path: 'home/news',
    });
  });
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (store.state.loginId) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/home/login',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
