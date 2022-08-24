import axios from './index';

export const apiGetWn = () => {
  return axios.post(
    'https://www.fastmock.site/mock/5ccec72a2e72fceba0799c3844ba3c0f/xs/success',
    undefined,
    {
      // 开启取消连续请求功能, 但有个问题是会在url后带上cancle, 后面看有没可以改的方法
      params: { cancle: true },
    }
  );
};
