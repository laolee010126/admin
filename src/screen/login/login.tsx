import './login.css';

import { Button, Card, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LockOutlined, UserOutlined } from '@ant-design/icons';

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const isAbled = !(username && password);
  async function handleLogin(username: string, password: string) {
    const { data } = await axios.post("http://localhost:3000/login", { username, password });
    if (data) {
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    }
  }

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
        <Button
          type="primary"
          style={{ width: 250 }}
          disabled={isAbled}
          onClick={() => {
            handleLogin(username, password);
          }}
        >
          登录
        </Button>
      </Card>
    </div>
  );
}

export default Login;
