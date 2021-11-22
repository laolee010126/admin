import 'antd/dist/antd.css';
import './dashboard.css';

import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

import {
    MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined
} from '@ant-design/icons';

import Today from './components/today';

const { Header, Sider, Content } = Layout;

function DashBoard() {
  const [collapsed, setcollapsed] = useState(false);

  const toggle = () => {
    setcollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? null : <div className="logo">RocketBDG</div>}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            유저관리
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            오더관리
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}></Menu.Item>
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
          <Today />
        </Content>
      </Layout>
    </Layout>
  );
}

export default DashBoard;
