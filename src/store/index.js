import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    detailsId: [], //摇号的ID 改为数组，加了状态判断  1同时摇号 2顺序摇号
    loginId: localStorage.getItem('loginId')
      ? localStorage.getItem('loginId')
      : '', //登录的ID
    times: '', //判断是第几次摇号 1第一次 2第二次 3第三场
    secondType: '', //判断第二次摇号时摇号码还是摇标的
    title: '',
    username: localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '', //用户名
    prizeList: [], //奖品列表
    summaryId: '', //公告卡片的独有id,
    stateType: '', //7种状态
  },
  mutations: {
    getDetailsId(state, id) {
      state.detailsId = id;
    },
    getLoginId(state, id) {
      state.loginId = id;
      localStorage.setItem('loginId', id);
    },
    getGameId(state, id) {
      state.gameId = id;
    },
    getTimes(state, value) {
      state.times = value;
    },
    getSecondType(state, value) {
      state.secondType = value;
    },
    getTitle(state, title) {
      state.title = title;
    },
    getName(state, username) {
      state.username = username;
      localStorage.setItem('username', username);
    },
    getPrizeList(state, prizeList) {
      state.prizeList = prizeList;
    },
    getId(state, id) {
      state.summaryId = id;
    },
    getStateType(state, type) {
      state.stateType = type;
    },
  },
  actions: {},
  modules: {},
});
