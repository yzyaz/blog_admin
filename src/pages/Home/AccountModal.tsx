import { Modal } from 'antd';
import { IAccountItem } from '../typing';

interface IProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  info?: IAccountItem;
}

const AccountModal = (props: IProps) => {
  const { onCancel, onOk, visible, info } = props;

  return (
    <Modal
      title={info ? '修改' : '新增'}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div>info</div>
    </Modal>
  );
};

export default AccountModal;
