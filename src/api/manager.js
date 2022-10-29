// 所有请求接口
import request from "@/utils/request.js" 

// 登录接口
export const LoginApi = ({username,password})=>request({
    url:'admin/login',
    method:'POST',
    data:{
        username,
        password
    }
})

// 获取管理员信息和权限菜单
export const getInfo = ()=>request({
    url:'admin/getinfo',
    method:'POST',
})

//修改密码
export const upPassWord = (data)=>request({
    url:'admin/updatepassword',
    method:'POST',
    data
})

//获取管理员信息和权限菜单
export const getInfoPermissions = ()=>request({
    url:'admin/getinfo',
    method:'POST'
})