/**
 * 取消连续请求, 默认关闭, 需要开启时需要再请求接口那里把[config]的params: { cancle: true }打开, 但有个问题是params配置会在url后带上cancle, 后面看有没可以改的方法
 */

import axios from 'axios';

const createCancel = () => {
  const pending: {
    [key: string]: any;
  } = {};
  const CancelToken = axios.CancelToken;
  const removePending = (conf: any) => {
    const url = conf.url;
    if (url in pending && conf.params && conf.params.cancle) {
      pending[url]();
      delete pending[url];
    }
  };

  return (config: any) => {
    if (config.url) {
      removePending(config);
      config.cancelToken = new CancelToken((c) => {
        const url = config.url;
        pending[url] = c;
      });
    }
  };
};

export default createCancel;
