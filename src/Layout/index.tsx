import { Suspense, useCallback } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { Layout, Menu, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { navList } from '../route/sortData';

import styles from './index.module.less';

const { Header, Sider, Content } = Layout;

interface IProps {}
type TProps = RouteConfigComponentProps<IProps>;

const BasicLayout = (props: TProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  const clickMenu = useCallback(
    (v) => {
      navigate(v.key);
    },
    [navigate]
  );

  return (
    <>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname || navList[0].path]}
            items={navList.map((item) => ({
              key: item.path,
              icon: item.icon,
              label: item.label,
            }))}
            onClick={clickMenu}
          />
        </Sider>
        <Layout className={styles.layout}>
          <Header />
          <Content className={styles.layoutContent}>
            <div className={styles.layoutContentBox}>
              <Suspense fallback={<Spin className="fallbackSpin" />}>
                {/* 路由元素插槽 */}
                <Outlet />
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default BasicLayout;
