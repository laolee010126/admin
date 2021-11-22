import './login.css';

import { Button, Card, Input } from 'antd';
import React, { useState } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const isAbled = !(username && password);
  return (
    <div className="wrapper">
      <Card style={{ width: 300 }}>
        <h1>RocketBDG</h1>
        <Input
          placeholder="登录管理者账号"
          value={username}
          onChange={(event) => setusername(event.target.value)}
          prefix={<UserOutlined />}
        />
        <br />
        <br />
        <Input.Password
          placeholder="密码"
          value={password}
          onChange={(event) => setpassword(event.target.value)}
          prefix={<LockOutlined />}
        />
        <br />
        <br />
        <Button type="primary" style={{ width: 250 }} disabled={isAbled}>
          登录
        </Button>
      </Card>
    </div>
  );
}

export default Login;
