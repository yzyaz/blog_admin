import { Button, Result, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import useGetTags from 'src/data/use-getTags';

import styles from './index.module.less';

interface IProps {}

const Tags = (props: IProps) => {
  const { data, isValidating, error } = useGetTags();
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
        dataIndex: 'tag',
        width: 240,
        render: (value) => value,
      },
      {
        title: '操作',
        dataIndex: 'p',
        width: 160,
        render: (value, record) => (
          <div>
            <Button type="primary">删除</Button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <h3>标签列表</h3>

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
export default Tags;
