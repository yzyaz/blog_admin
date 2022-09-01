import { Button } from 'antd';
// import { ColumnsType } from 'antd/es/table';
// import dayjs from 'dayjs';
// import { useMemo } from 'react';
// import useGetAccount from 'src/data/use-getAccount';
// import { IAccountItem } from '../typing';

import styles from './index.module.less';

interface IProps {}

const Home = (props: IProps) => {
  // const { data, isValidating, error, mutate } = useGetAccount();
  // console.log('data', data);

  return (
    <>
      <h3>后台账号信息</h3>

      <div className={styles.topBtn}>
        <Button
          type="primary"
          onClick={() => {
            // setVisible(true);
          }}
        >
          新增
        </Button>
      </div>

      <div className={styles.accountBox}></div>
    </>
  );
};
export default Home;
