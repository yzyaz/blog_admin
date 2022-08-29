/**
 * 文章列表
 */
import useSWR from 'swr';
import axios from 'src/api/base';

function useGetTags() {
  return useSWR(['/adminTags'], (url) =>
    axios
      .get<ApiResData<{ tag: string }[]>>(url)
      .then((res) => res.data?.data || [])
  );
}

export default useGetTags;
