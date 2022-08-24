import React from 'react';
import { useDispatch, useSelector } from 'src/models/hook';
import styles from './index.module.less';

// interface IProps {}

const Account = () => {
  const dispatch = useDispatch();
  const countState = useSelector((state) => state.count.num);

  const loadingObj = useSelector(
    (rootState) => rootState.loading.effects.count.fetchWn
  );
  
  React.useEffect(() => {
    dispatch.count.fetchWn();
  }, [dispatch.count]);

  console.log('loadingObj', loadingObj, loadingObj.error);

  return (
    <div className={styles.account}>
      Account
      <div className={styles.box}>
        countState:
        <br /> {countState}
        <br />
        <button
          onClick={() => {
            dispatch.count.increment(1);
          }}
        >
          点击触发dispatch同步
        </button>
        <button
          onClick={() => {
            dispatch.count.incrementAsync(2);
          }}
        >
          点击触发dispatch异步
        </button>
        <br />
        <button
          onClick={() => {
            dispatch.count.fetchWn();
          }}
        >
          点击请求数据
        </button>
      </div>
    </div>
  );
};
export default React.memo(Account);

Account.whyDidYouRender = true;
