/**
 * 账号列表
 */
import useSWR from 'swr';
import axios from 'src/api/base';
import { IAccountItem } from 'src/pages/typing';

function useGetAccount() {
  return useSWR(['/adminAccount'], (url) =>
    axios.get<ApiResData<IAccountItem>>(url).then((res) => res.data?.data || {})
  );
}

export default useGetAccount;
