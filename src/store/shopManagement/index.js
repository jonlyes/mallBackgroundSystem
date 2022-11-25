import { getShopList } from "@/api/shopManagement/shopManagement.js";

const shopManagement = {
  state: {
    shopList: [], //商品列表
  },
  getters: {},
  mutations: {},
  actions: {
    // 获取商品列表
    getShopList(store, {page,query}) {
      return new Promise((resolve, reject) => {
        getShopList(page, query)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
            console.log(err);
          });
      });
    },
  },
};

export default shopManagement;
