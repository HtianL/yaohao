import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/Users.vue";
import Search from "../views/Search";
import Login from "../components/login";
import Register from "../components/register";
import SignUp from "../components/signUp";
import Article from "../components/article";
import ChoicePrize from "../components/choicePrize";
import HelpCenter from "../components/helpCenter";
import News from "../components/news";
import Luck from "../components/luck";
import MyGame from "../components/mygame";
import MyGameHistory from "../components/mygamehistory";
import LuckList from "../components/luckList";
import UserDetails from "../components/userdetails";
import ChangePassword from "../components/changePassword";
Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/home/news",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home/news",
        name: "News",
        meta: {
          title: "公告信息"
        },
        component: News
      },
      {
        path: "/home/luck",
        name: "Luck",
        meta: {
          title: "摇奖页面",
          requireAuth: true
        },
        component: Luck
      },
      {
        path: "/home/article",
        name: "Article",
        meta: {
          title: "公告详情"
        },
        component: Article
      },
      {
        path: "/home/helpcenter",
        name: "HelpCenter",
        meta: {
          title: "帮助中心"
        },
        component: HelpCenter
      },
      {
        path: "/home/user",
        name: "User",
        meta: {
          title: "我的"
        },
        component: User
      },
      {
        path: "/home/login",
        name: "Login",
        meta: {
          title: "登录"
        },
        component: Login
      },
      {
        path: "/home/register",
        name: "Register",
        meta: {
          title: "注册"
        },
        component: Register
      },
      {
        path: "/home/signup",
        name: "SignUp",
        meta: {
          title: "报名"
        },
        component: SignUp
      },
      {
        path: "/home/choiceprize",
        name: "ChoicePrize",
        meta: {
          title: "选择标的"
        },
        component: ChoicePrize
      },
      {
        path: "/home/mygamehistory",
        name: "MyGameHistory",
        meta: {
          title: "我的摇号记录",
          requireAuth: true
        },
        component: MyGameHistory
      },
      {
        path: "/home/myGame",
        name: "MyGame",
        meta: {
          title: "我的报名",
          requireAuth: true
        },
        component: MyGame
      },
      {
        path: "/home/lucklist",
        name: "LuckList",
        meta: {
          title: "中奖名单"
        },
        component: LuckList
      },
      {
        path: "/home/userdetails",
        name: "UserDetails",
        meta: {
          title: "用户详情"
        },
        component: UserDetails
      },
      {
        path: "/home/changepassword",
        name: "ChangePassword",
        meta: {
          title: "修改密码"
        },
        component: ChangePassword
      }
    ]
  },
  {
    path: "*",
    redirect: "/home/news"
  }
];

const router = new VueRouter({
  routes
});

export default router;
