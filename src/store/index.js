import { createStore } from "vuex";
import { getInfo, upPassWord } from "@/api/manager.js"; //管理员模块API

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      userInfo: {},
    };
  },
  mutations: {
    // 存储用户信息
    SET_USERINFO(state, value) {
      state.userInfo = {...value}
    },
  },
  actions: {
    // 发起请求获得用户信息(actions里是写业务逻辑的)
    setUserInfo(store) {
      getInfo().then((res) => {
        store.commit("SET_USERINFO", res); //调用commit方法存储用户信息
      });
    },
    //发起请求修改密码
    updatePassWord(store, fromData) {
      return upPassWord(fromData);
    },
  },
});

export default store;
