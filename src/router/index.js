// 路由文件
import { createRouter, createWebHashHistory } from "vue-router";
import goodsManagement from "@/router/goodsManagement/index.js";
import masterStation from "@/router/backgroundPanel/index.js";
const routes = [
  {
    // 路径错误时跳到404提示页
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      title: "404 NotFound",
    },
    component: () => import("@/view/404.vue"),
  },
  {
    //登录页
    path: "/login",
    meta: {
      title: "登录页",
    },
    component: () => import("@/view/Login/index.vue"),
  },
  {
    // 首页
    path: "/",
    meta: {
      title: "首页",
    },
    children: [...masterStation, ...goodsManagement],
    component: () => import("@/view/layouts/index.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
