// 图库管理接口模块
import request from "@/utils/request.js";

// 获取图库列表
export const getSymmanList = (page) =>
  request({
    url: `admin/image_class/${page}?limit=10`,
    method: "GET",
  });

// 获取指定分类下的图片列表
export const getImageList = (id,page) =>
  request({
    url: `admin/image_class/${id}/image/${page}`,
    method: "GET",
  });

// 修改图片名称
export const editImageName = (id,name)=>request({
  url:`admin/image/${id}`,
  method:'POST',
  data:{
    name
  }
})

// 删除图片
export const delImage = (ids)=>request({
  url:'admin/image/delete_all',
  method:"POST",
  data:{
    ids
  }
})