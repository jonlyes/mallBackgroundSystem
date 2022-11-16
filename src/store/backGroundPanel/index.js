import { getStatisticsA, getStatisticsB,getStatisticsC } from "@/api/backgroundStatistics.js"; //后台统计模块接口
const backgroundPanel = {
  state: {
    // icon面板数据
    iconOptions: [
      { title: "用户", icon: "User", path: "/", color: "#38bdf8" },
      { title: "商品", icon: "ShoppingCart", path: "/", color: "#a78bfa" },
      { title: "订单", icon: "Tickets", path: "/", color: "#e879f9" },
      { title: "评价", icon: "ChatDotSquare", path: "/", color: "#34d399" },
      { title: "图库", icon: "Picture", path: "/", color: "#f87171" },
      { title: "公告", icon: "Bell", path: "/", color: "#34d399" },
      { title: "配置", icon: "SetUp", path: "/", color: "#222222" },
      { title: "优惠券", icon: "Files", path: "/", color: "#fb923c" },
    ],
  },
  getters: {
    // 获取icon面板数据
    getIconOptions(state) {
      return state.iconOptions;
    },
  },
  mutations: {},
  actions: {
    // 获取面板数据
    getPanelsInfo() {
      return new Promise((resolve, reject) => {
        // 发起请求获取panels数据
        getStatisticsA()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取订单数据
    getOrderData(store, type) {
      return new Promise((resolve, reject) => {
        getStatisticsC(type)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getShopTips(){
      return new Promise((resolve,reject)=>{
        getStatisticsB().then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  },
};

export default backgroundPanel;
