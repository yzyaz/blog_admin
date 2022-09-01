import { Form, Input, Button, Checkbox, message, Spin } from 'antd';
import { useLocalStorage } from 'react-use';
import md5 from 'md5';
import { adminLogin } from 'src/api/blog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const LOGIN_REMEMBERME_KEY = 'LOGIN_REMEMBERME_KEY';

const Login = () => {
  const navigate = useNavigate();

  // 本地数据
  const [storageLoginInfo, setStorageLoginInfo] = useLocalStorage(
    LOGIN_REMEMBERME_KEY,
    {}
  );

  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    // 是否保存信息
    if (values.rememberMe) {
      setStorageLoginInfo(values);
    } else {
      setStorageLoginInfo({});
    }
    // 登陆操作
    const infoMd5 = md5(values.username + values.password);
    const params = {
      infoMd5,
      name: values.username,
      rememberMe: values.rememberMe,
    };
    setLoading(true);
    adminLogin(params)
      .then((res) => {
        message.success('登录成功');
        navigate('/home');
      })
      .catch((err) => {
        message.error(err.message || '登陆失败');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading}>
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

            <Form.Item
              {...tailLayout}
              name="rememberMe"
              valuePropName="checked"
            >
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
    </Spin>
  );
};

export default Login;
