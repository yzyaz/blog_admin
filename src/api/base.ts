import axios, { AxiosRequestConfig } from 'axios';
// import https from 'https';

// export const BASE_URL =
//   'https://www.fastmock.site/mock/ecbb6182dbd3487a6fbe5b475c5175bc/blog';
export const BASE_URL = 'http://127.0.0.1:7001/admin';

export const BASE_CONFIG = {
  // 取消证书校验
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
  baseURL: BASE_URL,
  withCredentials: true,
};

/**
 * 基于基本的配置创建axios
 * @param baseURL 自定义baseURL
 * @param options 自定义aixos配置
 * @returns 新创建的基于基本配置自定义的axios实列
 */
export const createBaseAxios = (
  baseURL?: string,
  options?: AxiosRequestConfig
) =>
  axios.create({
    ...BASE_CONFIG,
    ...(baseURL ? { baseURL } : {}),
    ...(options ? options : {}),
  });

/** 默认拦截器 */
export const interceptorsDefault = function (response: any) {
  if (response.data.code !== 2000) {
    return Promise.reject(new Error(response.data.msg));
  }
  return response;
};

/** 基本的axios */
const axios_base = createBaseAxios();

axios_base.interceptors.request.use((config: any) => {
  return config;
});

axios_base.interceptors.response.use(interceptorsDefault);

export default axios_base;
