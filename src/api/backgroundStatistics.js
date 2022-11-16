// 封装后台统计模块接口
import request from "@/utils/request.js";

//获取后台统计模块1——面板数据
export const getStatisticsA = () =>
  request({
    url: "admin/statistics1",
    method: "GET",
  });

  //获取后台统计模块2——店铺商品及交易提示
  export const getStatisticsB = () =>
  request({
    url: "admin/statistics2",
    method: "GET",
  });
  

//获取后台统计模块3——订单数据
export const getStatisticsC = (type) =>
  request({
    url: `admin/statistics3?type=${type}`,
    method: "GET",
  });
