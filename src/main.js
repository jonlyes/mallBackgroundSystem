import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Router from "@/router/index.js"; //引入路由配置
import store from "@/store/index.js"; //vue状态管理
import ElementPlus from "element-plus"; //引入饿了么组件库
import "element-plus/dist/index.css"; //引入饿了么组件样式库
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //引入饿了么的icon库
import "virtual:windi.css"; //引入windi CSS框架
import "nprogress/nprogress.css"; //引入进度条 CSS样式
import "@/router/routingGuard.js"; //路由守卫函数
// import resize from '@/plugins/resize.js'

const app = createApp(App); //创建app
app.use(Router); //注册路由
app.use(store); //注册Vuex
app.use(ElementPlus); //注册饿了么组件库
// app.use(adapt) //注册封装的rem自适应插件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.directive('resize',resize)
app.mount("#app"); //挂载app