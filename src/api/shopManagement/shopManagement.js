//商品管理模块接口
import request from "@/utils/request.js";

//获取商品列表
export const getShopList = (page, query) => {
  let str = "";
  for (let key in query) {
    if (query[key]) {
      str = str + `${key}=${query[key]}&`;
    }
  }
  str = str.slice(0, str.length - 1);
  return request({
    url: `admin/goods/${page}?${str}`,
    method: "GET",
  });
};

// 新增商品
export const newIncreaseShop = (data) =>
  request({
    url: "admin/goods",
    method: "POST",
    data,
  });

// 批量删除商品
export const delShop = (ids) =>
  request({
    url: "admin/goods/delete_all",
    method: "POST",
    data: { ids },
  });

// 批量上架/下架商品
export const upDownShop = ({ ids, status }) =>
  request({
    url: "admin/goods/changestatus",
    method: "POST",
    data: {
      ids,
      status,
    },
  });

// 恢复商品
export const restoreShop = (ids) =>
  request({
    url: "admin/goods/restore",
    method: "POST",
    data: { ids },
  });

// 彻底删除商品
export const wipeOutShop = (ids) =>
  request({
    url: "admin/goods/destroy",
    method: "POST",
    data: { ids },
  });

// 审核商品
export const auditShop = (id, ischeck) =>
  request({
    url: `admin/goods/${id}/check`,
    method: "POST",
    data: { ischeck },
  });

// 修改商品
export const modifyShop = ({ id, data }) =>
  request({
    url: `admin/goods/${id}`,
    method: "POST",
    data,
  });

// 查看商品资料
export const readShopInfo = (id) =>
  request({
    url: `admin/goods/read/${id}`,
    method: "GET",
  });

// 添加商品规格选项
export const addGoodSkuCard = (data) =>
  request({
    url: "admin/goods_skus_card",
    method: "POST",
    data,
  });

// 更新修改商品规格
export const editSkuCard = (id, data) =>
  request({
    url: `admin/goods_skus_card/${id}`,
    method: "POST",
    data,
  });

// 删除规格选项
export const delSkuCard = (id) =>
  request({
    url: `admin/goods_skus_card/${id}/delete`,
    method: "POST",
  });

// 排序规格选项
export const sortSkuCard = (data) =>
  request({
    url: "admin/goods_skus_card/sort",
    method: "POST",
    data
  });

// 添加商品规格选项值
export const addGoodSkuCardValue = (data) =>
request({
  url: "admin/goods_skus_card_value",
  method: "POST",
  data,
});

// 修改商品规格选项值
export const editSkuCardValue = (id,data)=>request({
  url:`admin/goods_skus_card_value/${id}`,
  method:'POST',
  data
})

// 删除规格选项值
export const delSkuCardValue = (id)=>request({
  url:`admin/goods_skus_card_value/${id}/delete`,
  method:"POST"
})

// 选择要设置的规格选项和值
export const setSkuCard = (id,data)=>request({
  url:`admin/goods_skus_card/${id}/set`,
  method:"POST",
  data,
})