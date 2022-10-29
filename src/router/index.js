// 路由文件
import { createRouter, createWebHashHistory,} from "vue-router";

import NotFound from "@/view/404.vue"; //404页面
import Index from "@/view/layouts/index.vue"; //首页
import Login from "@/view/Login/index.vue"; //登录页面


const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta:{
      title:'404 NotFound'
    },
    component: NotFound,
  },
  {
    // 首页
    path: "/",
    meta:{
      title:'首页'
    },
    component: Index,
  },
  {
    path: "/login",
    meta:{
      title:'登录页'
    },
    component: Login,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
