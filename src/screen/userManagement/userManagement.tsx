import { Menu, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import { AppstoreOutlined } from '@ant-design/icons';

import LayoutSwapperPropsType from '../components/Layout';
import UserDescription from './components/UserDescription';
import UserTable from './components/UserTable';
import { getUsers } from './service/user';

function UserManagement() {
  const [current, setcurrent] = useState("All");
  const [visible, setvisible] = useState(false);
  const [editUserData, setEditUserData] = useState({
    id: "" as any,
    nameK: "",
    nameE: "",
    deposit: "" as any,
    role: "",
    email: "",
    phone: "",
    level: "" as any,
    businessRegistration: "",
    username: "",
    create_at: "",
    updated_at: "",
  });

  function handleOk() {
    setvisible(false);
  }

  function handleCancel() {
    setvisible(false);
  }

  function handleClick() {}

  return (
    <LayoutSwapperPropsType key="2">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="All" icon={<AppstoreOutlined />}>
          모든 유저내역 보기
        </Menu.Item>
      </Menu>
      <UserTable
        setvisible={setvisible}
        seteditUserData={setEditUserData}
        getInitialData={getUsers}
      />
      <Modal
        visible={visible}
        title="오더 정보"
        centered
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        width={1500}
      >
        <UserDescription userData={editUserData} />
      </Modal>
    </LayoutSwapperPropsType>
  );
}

export default UserManagement;
