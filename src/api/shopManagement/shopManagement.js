//商品管理模块接口
import request from "@/utils/request.js";

//获取商品列表
export const getShopList = (page, query) =>{
  let str =''
  for (let key in query) {
    str= str+`${key}=${query[key]}&`
  }
  str =str.slice(0,str.length-1)
  return request({
    url: `admin/goods/${page}?${str}`,
    method: "GET",
  });

}