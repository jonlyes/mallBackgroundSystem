// 路由守卫
import router from "@/router/index.js"; //路由
import { getToken } from "@/utils/cookies.js"; //cookies工具函数
import message from "@/utils/message.js"; //消息
import store from "@/store/index.js"; //vuex状态管理
import { showProgress, hideProgressBar } from "@/utils/progressBar.js";

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  showProgress();

  // 设置title标题
  document.title = to.meta
    ? to.meta.title + "-商城后台管理系统"
    : "-商城后台管理系统";

  //获取token
  const token = getToken();
  // 判断是否登录，没有登录强制跳转登录页面
  if (!token && to.path !== "/login") {
    message("请先登录");
    return next({ path: "/login" });
  }

  // 获取用户信息并存储到state
  if (token) {
    store.dispatch("setUserInfo");
  }

  //防止重复登录
  if (token && to.path == "/login") {
    return next({ path: from.path });
  }
  //判断是否是首页，获取管理员信息和权限

  next();
});

// 全局后置守卫
// 关闭进度条
router.afterEach(() => hideProgressBar());
