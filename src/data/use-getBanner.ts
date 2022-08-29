/**
 * 文章列表
 */
import useSWR from 'swr';
import axios from 'src/api/base';
import { BannerItem } from 'src/pages/typing';

function useGetBanner() {
  return useSWR(['/adminBanner'], (url) =>
    axios.get<ApiResData<BannerItem[]>>(url).then((res) => res.data?.data || [])
  );
}

export default useGetBanner;
