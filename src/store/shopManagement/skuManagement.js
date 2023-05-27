// 商品管理模块
import { getSkusList } from "@/api/shopManagement/skuManagement.js";

const skuManagement = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 获取规格列表
    getSkusList(store,page){
      return new Promise((resolve, reject) => {
        getSkusList(page).then(res=>{
          resolve(res)
        })
      }).catch(err=>{
        reject(err)
      })
    }
  },
};

export default skuManagement;
