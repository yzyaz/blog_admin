/**
 * 获取文章详情页
 */
import useSWR from 'swr';
import axios from 'src/api/base';
import { ArticleAllMsgListItem } from 'src/pages/typing';

function useGetArticle(id?: string) {
  return useSWR(id ? ['/adminGetArticle', id] : null, (url, id) =>
    axios
      .post<ApiResData<ArticleAllMsgListItem>>(url, { id })
      .then((res) => res.data?.data || {})
  );
}

export default useGetArticle;
