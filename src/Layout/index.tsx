import { Suspense, useCallback } from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { Layout, Menu, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { navList } from '../route/sortData';

import styles from './index.module.less';

const { Header, Sider, Content } = Layout;

interface IProps {}
type TProps = RouteConfigComponentProps<IProps>;

const BasicLayout = (props: TProps) => {
  const history = useHistory();

  const clickMenu = useCallback(
    (v) => {
      history.push(v.key);
    },
    [history]
  );

  return (
    <>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[history.location.pathname || navList[0].path]}
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
                {renderRoutes(props.route?.routes)}
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default BasicLayout;
