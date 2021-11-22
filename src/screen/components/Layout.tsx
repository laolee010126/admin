import { Col, Layout, Menu } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, MoneyCollectOutlined, UploadOutlined, UserOutlined
} from '@ant-design/icons';

type LayoutSwapperPropsType = {
  key: string;
  children: ReactElement<any, any> | ReactElement[];
};

export function LayoutSwapper(props: LayoutSwapperPropsType) {
  const [collapsed, setcollapsed] = useState(false);
  const toggle = () => {
    setcollapsed(!collapsed);
  };
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? null : <div className="logo">RocketBDG</div>}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.key]}>
          <Menu.Item key="1" icon={<UploadOutlined />} onClick={() => navigate("/dashboard")}>
            대쉬보드
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate("/usermanagement")}>
            유저관리
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => navigate("/ordermanagement")}>
            오더관리
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<MoneyCollectOutlined />}
            onClick={() => navigate("/rechargemanagement")}
          >
            예치금관리
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 800,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutSwapper;
const { Header, Sider, Content } = Layout;
