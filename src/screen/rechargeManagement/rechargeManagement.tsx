import { Menu } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import LayoutSwapperPropsType from '../components/Layout';
import AllDepositTable from './components/AllDepositTable';
import NeedCheckDepositTable from './components/NeedCheckDepositTable';

function RechargeManagement() {
  const [current, setCurrent] = useState("NeedCheck");

  function handleClick(e: any) {
    console.log("click ", e);
    setCurrent(e.key);
  }

  function MainScreen() {
    if (current === "All") {
      return <AllDepositTable />;
    } else if (current === "NeedCheck") {
      return <NeedCheckDepositTable />;
    }
    return <></>;
  }

  return (
    <LayoutSwapperPropsType key="4">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="NeedCheck" icon={<AppstoreOutlined />}>
          확인 필요한 예치금 신청
        </Menu.Item>
        <Menu.Item key="All" icon={<MailOutlined />}>
          예치금 신청 모두보기
        </Menu.Item>
      </Menu>
      <MainScreen />
    </LayoutSwapperPropsType>
  );
}

export default RechargeManagement;
