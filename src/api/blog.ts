import { ArticleAllMsgListItem } from 'src/pages/typing';
import axios from './base';

/** 上传图片 */
export const uploadImgFile = (params: { file: any }) => {
  const fd = new FormData();
  fd.append('file', params?.file);
  return axios.post('/adminUploadImg', fd, {
    headers: {
      'content-type': 'multipart/form-data;',
    },
  });
};

/** 登录 */
export const adminLogin = (params: {
  username: string;
  password: string;
  rememberMe: boolean;
}) => {
  return axios.post('/adminLogin', params);
};

/** 上传文章 */
export const adminAddArticle = (params: ArticleAllMsgListItem) => {
  return axios.post('/adminAddArticle', params);
};

/** 修改文章 */
export const adminAlterArticle = (params: ArticleAllMsgListItem) => {
  return axios.post('/adminAlterArticle', params);
};

/** 删除文章 */
export const adminDeleteArticle = (params: { id: string }) => {
  return axios.post('/adminDeleteArticle', params);
};

/** 获取指定文章 */
export const adminGetArticle = (params: { id: string }) => {
  return axios.post('/adminGetArticle', params);
};
