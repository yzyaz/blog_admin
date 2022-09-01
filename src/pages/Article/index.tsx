import { Button, message, Modal, Result, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { adminDeleteArticle } from 'src/api/blog';
import useGetList from 'src/data/use-getList';

import styles from './index.module.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const tagColor = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];

const params = {
  size: 20,
  start: 1,
};

const Article = () => {
  const { data, isValidating, error, mutate } = useGetList(params);
  const list = data?.list || [];

  const [loading, setLoading] = useState(false);

  const deleteArticle = useCallback(
    (id: string) => {
      id &&
        confirm({
          title: '确定要删除本条数据?',
          icon: <ExclamationCircleOutlined />,
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk() {
            setLoading(true);
            adminDeleteArticle({ id })
              .then((res) => {
                message.success('操作成功');
                mutate();
              })
              .catch((err) => {
                message.warning(err.message);
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
        dataIndex: 'title',
        width: 160,
        render: (value) => (
          <div title={value} className="ellipsis1">
            {value}
          </div>
        ),
      },
      {
        title: '描述',
        dataIndex: 'desc',
        render: (value) => (
          <div title={value} className="ellipsis1">
            {value}
          </div>
        ),
      },
      {
        title: '标签',
        dataIndex: 'tags',
        width: 160,
        render: (value) => (
          <div>
            {value?.split(/，|,/).map((i: string, idx: number) => (
              <Tag color={tagColor[idx % 12]} key={i}>
                {i}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        title: '发布时间',
        dataIndex: 'date',
        width: 120,
        render: (value) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
      {
        title: '最近修改时间',
        dataIndex: 'alertDate',
        width: 120,
        render: (value) =>
          value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
      },
      {
        title: '封面',
        dataIndex: 'cover',
        width: 80,
        render: (value) =>
          value && (
            <a href={value} target="_blank" rel="noreferrer">
              <img className={styles.cover} src={value} alt="" />
            </a>
          ),
      },
      {
        title: '浏览量',
        dataIndex: 'views',
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'p',
        width: 240,
        render: (value, record) => (
          <div>
            <Button
              type="primary"
              href={`/article-detail?id=${record.id}`}
              target="_blank"
            >
              修改
            </Button>
            <Button href="http://yuzhiyong.life" target="_blank">
              浏览
            </Button>
            <Button
              danger
              onClick={() => {
                deleteArticle(record.id);
              }}
            >
              删除
            </Button>
          </div>
        ),
      },
    ],
    [deleteArticle]
  );

  return (
    <>
      <h3>文章列表</h3>
      <div className={styles.topBtn}>
        <Button type="primary" href="/article-detail" target="_blank">
          新增
        </Button>
      </div>
      {error ? (
        <Result status="warning" title={error.message || ''} />
      ) : (
        <Table
          columns={columns}
          rowKey="id"
          dataSource={list}
          loading={isValidating || loading}
        />
      )}
    </>
  );
};
export default Article;
