import Home from 'src/pages/Home';
import Account from 'src/pages/Account';
import { RouteConfig } from 'react-router-config';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/account',
        exact: true,
        component: Account,
      },
    ],
  },
];
export default routes;
