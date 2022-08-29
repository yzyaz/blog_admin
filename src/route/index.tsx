import BasicLayout from 'src/Layout';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router';
import { navList } from './sortData';
import { lazy } from 'react';

const ArticleDetail = lazy(() => import('src/pages/ArticleDetail'));
const Login = lazy(() => import('src/pages/Login'));

const routes: RouteConfig[] = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/article-detail',
    exact: true,
    component: ArticleDetail,
  },
  {
    path: '/',
    component: BasicLayout,
    routes: [
      {
        path: '/',
        exact: true,
        // 重定向
        render: () => <Redirect to="/home" />,
      },
      ...navList,
    ],
  },
];
export default routes;
