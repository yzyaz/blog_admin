import { Suspense, useCallback } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { Button, Layout, Menu, message, Spin } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { navList } from '../route/sortData';

import styles from './index.module.less';
import { adminLogout } from 'src/api/blog';

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

  // 登出
  const logout = useCallback(() => {
    adminLogout()
      .then((res) => {
        message.success('操作成功');
        navigate('/login');
      })
      .catch((err) => {
        message.warning(err.message || '操作失败');
      });
  }, [navigate]);

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
          <Header className={styles.header}>
            <Button
              type="primary"
              danger
              className={styles.logout}
              onClick={logout}
            >
              登出
            </Button>
          </Header>
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
