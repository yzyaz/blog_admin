/** 文章列表请求 (暂时只弄展示每页筛选功能) */
export interface ArticleListParams {
  /** 当前页 */
  start: number;
  /** 每页多少 */
  size: number;
  /** 包含字段 */
  keyword?: string;
  /** 标签 */
  tag?: string[];
  /** 日期范围 */
  data?: string;
}

/** 文章列表item */
export interface ArticleListItem {
  /** 标题 */
  title: string;
  /** 简略描述 */
  desc: string;
  id: string;
  /** 上传日期 */
  date: string;
  /** 标签 */
  tags: string;
  /** 封面 */
  cover: string;
  /** 浏览量 */
  views: number;
}

/** 文章列表所有信息item */
export interface ArticleAllMsgListItem extends ArticleListItem {
  content: string;
}

/** banner */
export interface BannerItem {
  /** 标题 */
  title: string;
  /** 地址 */
  src: string;
  id: string;
}

/** 账号 */
export interface IAccountItem {
  id: string;
  /** 账号 */
  name: string;
  /** 描述 */
  desc: string;
  alterDate: string;
}

// ===============
export interface HomeServersInfo {
  urlType: string;
  listData: PagingData<ArticleListItem[]>;
  bannerList: BannerItem[];
}
