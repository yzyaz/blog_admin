import { Button, Result, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import useGetBanner from 'src/data/use-getBanner';

import styles from './index.module.less';

interface IProps {}

const Article = (props: IProps) => {
  const { data, isValidating, error } = useGetBanner();
  const list = data || [];

  const columns = useMemo<ColumnsType<any>>(
    () => [
      {
        title: '序号',
        dataIndex: 'index',
        render: (value, record, index) => index + 1,
        width: 60,
      },
      {
        title: '标题',
        dataIndex: 'title',
        width: 240,
        render: (value) => (
          <div title={value} className="ellipsis1">
            {value}
          </div>
        ),
      },
      {
        title: 'banner',
        dataIndex: 'src',
        render: (value) => (
          <a href={value} target="_blank" rel="noreferrer">
            <img src={value} alt="" className={styles.banner} />
          </a>
        ),
      },
      {
        title: '操作',
        dataIndex: 'p',
        width: 160,
        render: (value, record) => (
          <div>
            <Button type="primary">修改</Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <h3>banner列表</h3>

      <div className={styles.topBtn}>
        <Button type="primary">新增</Button>
      </div>

      {error ? (
        <Result status="warning" title={error.message || ''} />
      ) : (
        <Table
          columns={columns}
          rowKey="src"
          dataSource={list}
          loading={isValidating}
        />
      )}
    </>
  );
};
export default Article;
