/**
 * 文章列表
 */
import useSWR from 'swr';
import axios from 'src/api/base';
import { ArticleListItem, ArticleListParams } from 'src/pages/typing';

function useGetList(param?: ArticleListParams) {
  return useSWR(param ? ['/adminList', param] : null, (url, param) =>
    axios
      .post<ApiResData<PagingData<ArticleListItem[]>>>(url, param)
      .then((res) => res.data?.data || {})
  );
}

export default useGetList;
