// 封装axios请求
import theAxios from "axios";
import message from "@/utils/message.js"; //消息提示
import { getToken } from "@/utils/token.js"; //获取token值
import router from "@/router/index.js";

const axios = theAxios.create({
  baseURL: "/api", // 请求根路径
  timeout: 10000, // 10秒超时时间
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么

    // 在请求之前添加token请求头
    const token = getToken();
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么;
    if (error.response.data.msg === "非法token，请先登录！") {
      //跳到登录页面
      router.push("/login");
    }

    message(error.response.data.msg || "登录失败！", "error");
    return Promise.reject(error);
  }
);

export default ({
  url,
  method = "GET",
  data = {},
  params = {},
  headers = {},
}) => {
  return axios({
    url,
    method,
    data,
    params,
    headers,
  });
};
