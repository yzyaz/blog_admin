import React, { useCallback, useState } from 'react';
import { Modal, Input, message } from 'antd';
import { adminAddTags } from 'src/api/blog';

import styles from './index.module.less';

interface IProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const TagModal = (props: IProps) => {
  const { visible, onCancel, onOk } = props;

  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const _onOk = useCallback(() => {
    setLoading(true);
    adminAddTags({ tags: value.split(/,|，/) })
      .then((res) => {
        message.success('操作成功');
        onOk();
      })
      .catch((err) => {
        message.warning(err.message || '操作失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onOk, value]);

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={_onOk}
      onCancel={onCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <div className={styles.tagModal}>
        <div>请输入tag, 多个以, 分割</div>
        <Input
          onChange={(e) => {
            setValue(e.target.value || '');
          }}
          value={value}
        />
      </div>
    </Modal>
  );
};

export default TagModal;
