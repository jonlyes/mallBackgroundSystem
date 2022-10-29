// 封装cookie工具函数
import { useCookies } from "@vueuse/integrations/useCookies";

const TokenKey = "mallSystem";
const cookie = useCookies();

// 设置token
export const setToken = (token) => cookie.set(TokenKey, token);

//获取token
export const getToken = () => cookie.get(TokenKey);

// 删除token
export const removeToken =  ()=>cookie.remove(TokenKey)