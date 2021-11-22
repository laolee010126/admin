import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { UsergroupAddOutlined } from '@ant-design/icons';

const Today = () => {
  const [userNumber, setuserNumber] = useState(0);

  useEffect(() => {
    setuserNumber(process.env.PUBLIC_URL as any);

    async function a() {
      const { data } = await axios.post(
        `http://014b-2409-8a3c-512e-9660-ed18-541b-1716-5bf4.ngrok.io/login`,
        {
          username: "string",
          password: "string",
        }
      );
    }
    a();
  }, []);

  return (
    <Card style={{ width: 400, height: 200, borderWidth: 2 }}>
      <text>유저정보</text>
      <div>{userNumber}</div>
    </Card>
  );
};

export default Today;
