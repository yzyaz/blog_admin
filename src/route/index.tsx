import { Navigate, RouteObject } from 'react-router-dom';
import { navList } from './sortData';
import { lazy } from 'react';

const BasicLayout = lazy(() => import('src/Layout'));
const ArticleDetail = lazy(() => import('src/pages/ArticleDetail'));
const Login = lazy(() => import('src/pages/Login'));

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/article-detail',
    element: <ArticleDetail />,
  },
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      {
        path: '/',
        // 重定向
        element: <Navigate to="/home" replace={true} />,
      },
      ...navList.map((i) => ({
        path: i.path,
        element: <i.element />,
      })),
    ],
  },
];

export default routes;
