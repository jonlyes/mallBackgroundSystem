// 规格管理接口
import request from "@/utils/request.js";

// 获取商品规格列表
export const getSkusList = (page)=>request({
    url:`admin/skus/${page}`,
    method:'GET'
})