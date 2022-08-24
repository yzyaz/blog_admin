import axios, { AxiosResponse } from 'axios';
import createCancel from './createCancel';
// import createError from './createError';

// baseUrl, 按实际情况配置
const baseURL = '';
const instance = axios.create({
  baseURL,
});

// 取消连续请求(这个函数一定要放在最外层)
const cancelFun = createCancel();
// 请求拦截器
instance.interceptors.request.use(function (config: any) {
  // 在发送请求之前做些什么
  cancelFun(config);
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse<unknown>) {
    // const code = response.data.code
    //   ? response.data.code === 2000
    //   : (response.data as any).success;

    // if (!code) {
    //   return Promise.reject(
    //     // 接口正确返回,状态码对不上,自定义错误信息
    //     createError(
    //       response.data.msg,
    //       response.config,
    //       response.data.code,
    //       response.request,
    //       response
    //     )
    //   );
    // }
    return response;
  },
  function (error) {
    // 接口错误返回,直接抛出错误
    return Promise.reject(error);
  }
);

export default instance;
