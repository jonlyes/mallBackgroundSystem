// 路由守卫
import router from "@/router/index.js"; //路由
import { getToken } from "@/utils/token.js"; //token值
import message from "@/utils/message.js"; //消息
import store from "@/store/index.js"; //vuex状态管理
import { showProgress, hideProgressBar } from "@/utils/progressBar.js";

// 全局路由前置守卫
router.beforeEach(async (to, from) => {
  // 开启进度条
  showProgress();

  // 设置title标题
  document.title = to.meta
    ? to.meta.title + "-商城后台管理系统"
    : "-商城后台管理系统";
  3;

  //获取token
  const token = getToken();

  //防止重复登录
  if (token && to.path == "/login") {
    if ((from.path = "/login")) {
      return { path: "/" };
    }
    return { path: from.path !== "/login" ? from.path : "/" };
  }

  // 获取用户信息并存储到state
  if (token) {
    // store.dispatch('setTag',to)
    await store.dispatch("setUserInfo").catch((err) => {
      console.log(err);
      message("请求失败，请检查网络是否有问题", "error");
    });
  }

  // 判断是否登录，没有登录强制跳转登录页面
  if (!token && to.path !== "/login") {
    message("请先登录");
    return { path: "/login" };
  }

  return true;
});

// 全局后置守卫
// 关闭进度条
router.afterEach(() => hideProgressBar());
