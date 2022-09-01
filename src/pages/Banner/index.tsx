import { Button, message, Modal, Result, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { adminDelBanner } from 'src/api/blog';
import useGetBanner from 'src/data/use-getBanner';
import { BannerItem } from '../typing';
import BannerModal from './BannerModal';

import styles from './index.module.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Article = () => {
  const { data, isValidating, error, mutate } = useGetBanner();
  const list = data || [];

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [bannerItem, setBannerItem] = useState<undefined | BannerItem>(
    undefined
  );

  const deleteBanner = useCallback(
    (id) => {
      id &&
        confirm({
          title: '确定要删除本条数据?',
          icon: <ExclamationCircleOutlined />,
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk() {
            setLoading(true);
            adminDelBanner({ id })
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

  const columns = useMemo<ColumnsType<BannerItem>>(
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
        title: '操作',
        dataIndex: 'p',
        width: 160,
        render: (value, record) => (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
                setBannerItem(record);
              }}
            >
              修改
            </Button>
            <Button
              danger
              onClick={() => {
                deleteBanner(record.id);
              }}
            >
              删除
            </Button>
          </div>
        ),
      },
    ],
    [deleteBanner]
  );

  return (
    <>
      <h3>banner列表</h3>

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

      <BannerModal
        visible={visible}
        info={bannerItem}
        onCancel={() => {
          setVisible(false);
          setBannerItem(undefined);
        }}
        onOk={() => {
          setVisible(false);
          mutate();
          setBannerItem(undefined);
        }}
      />
    </>
  );
};
export default Article;
