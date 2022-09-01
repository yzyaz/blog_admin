import { Input, message, Modal, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { adminAddBanner, adminAlterBanner, uploadImgFile } from 'src/api/blog';
import { BannerItem } from '../typing';

import styles from './index.module.less';

interface IProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  info?: BannerItem;
}

const BannerModal = (props: IProps) => {
  const { visible, onCancel, onOk, info } = props;

  const [bannerName, setBannerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState('');

  // 封面上传
  const bannerChange = useCallback((value) => {
    const file = value?.target?.files[0];
    uploadImgFile({ file })
      .then((res) => {
        const item = res.data?.data?.[0];
        const banner = `${process.env.REACT_APP_SERVER_HOST}${item.url}`;
        setBanner(banner);
      })
      .catch((err) => {
        message.warning(err.message || '操作失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const _onOk = useCallback(() => {
    if (bannerName && banner) {
      setLoading(true);
      const Api = info
        ? adminAlterBanner({
            title: bannerName,
            src: banner,
            id: info.id || '',
          })
        : adminAddBanner({ title: bannerName, src: banner });
      Api.then((res) => {
        message.success('操作成功');
        onOk();
      })
        .catch((err) => {
          message.warning(err.message || '操作失败');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      message.warning('请填写完整');
    }
  }, [banner, bannerName, info, onOk]);

  useEffect(() => {
    const title = info?.title || '';
    const src = info?.src || '';
    setBannerName(title);
    setBanner(src);
  }, [info]);

  return (
    <Modal
      title={info ? '修改banner' : '增加banner'}
      visible={visible}
      onOk={_onOk}
      onCancel={onCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <div className={styles.bannerBox}>
          <Input
            value={bannerName}
            placeholder="banner名称"
            style={{ marginBottom: 24 }}
            onChange={(e) => {
              setBannerName(e.target.value || '');
            }}
          />

          <Input
            type="file"
            onChange={bannerChange}
            placeholder="请选择或拖动图片"
          />
          {banner && <img src={banner} alt="" className={styles.bannerImg} />}
        </div>
      </Spin>
    </Modal>
  );
};

export default BannerModal;
