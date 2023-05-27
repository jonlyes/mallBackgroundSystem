// 商品管理模块
import {
  getShopList,
  newIncreaseShop,
  delShop,
  upDownShop,
  restoreShop,
  wipeOutShop,
  auditShop,
  modifyShop,
  readShopInfo,
  addGoodSkuCard,
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
    // 新增商品
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
    // 批量删除商品
    delShop(store, ids) {
      return new Promise((resolve, reject) => {
        delShop(ids)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 上下架商品
    upDownShop(store, { ids, status }) {
      return new Promise((resolve, reject) => {
        upDownShop({ ids, status })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 恢复商品
    restoreShop(store, ids) {
      return new Promise((resolve, reject) => {
        restoreShop(ids)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 彻底删除商品
    wipeOutShop(store, ids) {
      return new Promise((resolve, reject) => {
        wipeOutShop(ids)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 审核商品
    auditShop(store, { id, isCheck }) {
      return new Promise((resolve, reject) => {
        auditShop(id, isCheck)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 修改商品
    modifyShop(store, { id, data }) {
      return new Promise((resolve, reject) => {
        modifyShop({ id, data })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 查看商品资料
    readShopInfo(store, id) {
      return new Promise((resolve, reject) => {
        readShopInfo(id)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 添加商品规格选项
    addGoodSkuCard(store, data) {
      return new Promise((resolve, reject) => {
        addGoodSkuCard(data)
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
