import {
  getShopList,
  newIncreaseShop,
} from "@/api/shopManagement/shopManagement.js";

const shopManagement = {
  state: {
    shopList: [], //商品列表
  },
  getters: {},
  mutations: {},
  actions: {
    // 获取商品列表
    getShopList(store, { page, query }) {
      return new Promise((resolve, reject) => {
        getShopList(page, query)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    addShop(store, data) {
      return new Promise((resolve, reject) => {
        newIncreaseShop(data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};

export default shopManagement;
