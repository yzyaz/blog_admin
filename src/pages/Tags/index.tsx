import { Button, message, Modal, Result, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useCallback, useMemo, useState } from 'react';
import useGetTags from 'src/data/use-getTags';
import { adminDelTags } from 'src/api/blog';
import TagModal from './TagModal';

import styles from './index.module.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Tags = () => {
  const { data, isValidating, error, mutate } = useGetTags();
  const list = data || [];

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const deleteTag = useCallback(
    (tag) => {
      tag &&
        confirm({
          title: '确定要删除本条数据?',
          icon: <ExclamationCircleOutlined />,
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk() {
            setLoading(true);
            adminDelTags({ tag })
              .then((res) => {
                message.success('操作成功');
                mutate();
              })
              .catch((err) => {
                message.warning(err.message || '操作失败');
              })
              .finally(() => {
                setLoading(false);
              });
          },
        });
    },
    [mutate]
  );

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
            <Button
              danger
              onClick={() => {
                deleteTag(record.tag);
              }}
            >
              删除
            </Button>
          </div>
        ),
      },
    ],
    [deleteTag]
  );

  return (
    <>
      <h3>标签列表</h3>

      <div className={styles.topBtn}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          新增
        </Button>
      </div>

      {error ? (
        <Result status="warning" title={error.message || ''} />
      ) : (
        <Table
          columns={columns}
          rowKey="src"
          dataSource={list}
          loading={isValidating || loading}
        />
      )}

      <TagModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
          mutate();
        }}
      />
    </>
  );
};
export default Tags;
