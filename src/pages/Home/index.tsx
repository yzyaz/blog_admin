import React from 'react';
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config';
import { changeTheme } from 'src/utils/common';

import styles from './index.module.less';

interface IProps {}
type TProps = RouteConfigComponentProps<IProps>;

const Home = (props: TProps) => {
  console.log('process.env', process.env);

  return (
    <>
      <div className={styles.home}>
        Home
        <button
          onClick={() => {
            changeTheme('themeWarm');
          }}
        >
          点我换肤:Warm模式
        </button>
        <button
          onClick={() => {
            changeTheme();
          }}
        >
          点我换肤:默认模式
        </button>
      </div>
      {props.route && renderRoutes(props.route.routes)}
    </>
  );
};
export default React.memo(Home);

Home.whyDidYouRender = true;
