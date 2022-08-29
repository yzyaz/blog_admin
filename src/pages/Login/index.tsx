import { Form, Input, Button, Checkbox, message } from 'antd';
import { useLocalStorage } from 'react-use';
import md5 from 'md5';
import { adminLogin } from 'src/api/blog';

import styles from './index.module.less';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

const LOGIN_INFO_KEY = 'LOGIN_INFO_KEY';

const Login = () => {
  // 本地数据
  const [storageLoginInfo, setStorageLoginInfo] = useLocalStorage(
    LOGIN_INFO_KEY,
    {}
  );

  const onFinish = (values: any) => {
    // 是否保存信息
    if (values.rememberMe) {
      setStorageLoginInfo(values);
    } else {
      setStorageLoginInfo({});
    }
    // 登陆操作
    values.password = md5(values.password);
    adminLogin(values)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err');
        message.error(err.message || '登陆失败');
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.center}>
        <h1>login</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={storageLoginInfo}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="rememberMe" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
