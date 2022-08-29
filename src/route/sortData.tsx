import { HomeOutlined, CopyOutlined } from '@ant-design/icons';
import { lazy } from 'react';

const Home = lazy(() => import('src/pages/Home'));
const Article = lazy(() => import('src/pages/Article'));
const Banner = lazy(() => import('src/pages/Banner'));
const Tags = lazy(() => import('src/pages/Tags'));

export const navList = [
  {
    // label icon用于侧边栏
    label: '首页',
    icon: <HomeOutlined />,

    path: '/home',
    exact: true,
    component: Home,
  },
  {
    label: '文章',
    icon: <CopyOutlined />,

    path: '/article',
    exact: true,
    component: Article,
  },
  {
    label: 'banner',
    icon: <CopyOutlined />,

    path: '/banner',
    exact: true,
    component: Banner,
  },
  {
    label: '标签',
    icon: <CopyOutlined />,

    path: '/tags',
    exact: true,
    component: Tags,
  },
];
