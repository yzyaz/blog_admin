// 全局定义

declare module '*.pdf' {
  const src: string;
  export default src;
}

interface ApiResData<T> {
  data: T;
  code: number | string;
  msg: string;
}

/** 分页的数据格式 */
interface PagingData<T> {
  list: T;
  total: number;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const src: string;
  export default src;
}
