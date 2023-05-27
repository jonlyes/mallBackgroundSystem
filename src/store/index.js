import { createStore } from "vuex";
import router from "@/router/index.js"; //路由器
import navList from "@/store/navList/index.js"; //路由导航模块store
import { loginApi, getInfo, upPassWord } from "@/api/manager.js"; //管理员模块API
import backGroundPanel from "@/store/backGroundPanel/index.js"; //主控台模块store
import shopManagement from "@/store/shopManagement/shopManagement.js"; //商品管理模块store
import skuManagement from "@/store/shopManagement/skuManagement.js"; //规格管理模块
import galleryManagement from "@/store/otherModules/galleryManagement.js"; //图库管理模块
import { setToken, removeToken } from "@/utils/token.js"; //token值

import { removeTagsList } from "@/utils/tagsList.js";
import { ElMessageBox } from "element-plus"; //消息弹出框
import Message from "@/utils/message.js"; //消息提示框

// 创建一个新的 store 实例
const store = createStore({
  state: {
    userInfo: {},
    asideWidth: "250px",
  },
  mutations: {
    // 存储用户信息
    SET_USERINFO(state, value) {
      state.userInfo = value;
    },
    // 修改侧边栏宽度
    ASIDE_MENU_WIDTH(state, width) {
      state.asideWidth = width;
    },
  },
  actions: {
    // 登录并存储token
    login(store, fromDate) {
      return new Promise((resolve, reject) => {
        loginApi(fromDate).then((res) => {
          //存储token
          setToken(res.token);
          resolve(res);
        });
      });
    },
    //退出登录并输出token值
    logout() {
      return new Promise((resolve, reject) => {
        ElMessageBox.confirm("是否要退出登录", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          // 确定退出调用
          removeToken(); //删除cookies的token值
          removeTagsList(); //删除tagsList路由列表
          router.push("/login");
          Message("退出登录成功！");
          resolve();
        });
      });
    },
    // 发起请求获得用户信息(actions里是写业务逻辑的)
    setUserInfo(store) {
      return new Promise((resolve, reject) => {
        // 如果state的userInfo有menus并且menus数组长度大于零，则不发起请求直接resolve
        if (store.state.userInfo.menus?.length > 0) {
          resolve();
        } else {
          // userInfo的menus不存在或者其length长度等于零，则发起请求获取用户信息及其菜单权限
          getInfo()
            .then((res) => {
              store.commit("SET_USERINFO", res); //调用commit方法存储用户信息
              resolve(res);
            })
            .catch((err) => reject(err));
        }
      });
    },
    //发起请求修改密码
    updatePassWord(store, fromData) {
      return upPassWord(fromData).then(() => {
        removeToken(); //删除cookies的token值
        Message("修改密码成功，请重新登录！");
        router.push("/login"); //跳转到登录页
      });
    },
    // 判断侧边栏是否收起并修改相应的的宽度
    asideMenuWidth(store) {
      store.commit(
        "ASIDE_MENU_WIDTH",
        store.state.asideWidth === "250px" ? "64px" : "250px"
      );
    },
  },
  modules: {
    navList,
    backGroundPanel,
    shopManagement,
    skuManagement,
    galleryManagement,
  },
});

export default store;
