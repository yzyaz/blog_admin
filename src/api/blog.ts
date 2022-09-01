import { ArticleAllMsgListItem, BannerItem } from 'src/pages/typing';
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
  /** 账号密码加密传输 */
  infoMd5: string;
  /** 账号 */
  name: string;
  /** 记住我 */
  rememberMe: boolean;
}) => {
  return axios.post('/adminLogin', params);
};

/** 登出 */
export const adminLogout = () => {
  return axios.get('/adminLogout');
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

/** 删除banner */
export const adminDelBanner = (params: { id: string }) => {
  return axios.post('/adminDelBanner', params);
};

/** 新增banner */
export const adminAddBanner = (params: Omit<BannerItem, 'id'>) => {
  return axios.post('/adminAddBanner', params);
};

/** 修改banner */
export const adminAlterBanner = (params: BannerItem) => {
  return axios.post('/adminAlterBanner', params);
};

/** 删除tag */
export const adminDelTags = (params: { tag: string }) => {
  return axios.post('/adminDelTags', params);
};

/** 增加tag */
export const adminAddTags = (params: { tags: string[] }) => {
  return axios.post('/adminAddTags', params);
};
