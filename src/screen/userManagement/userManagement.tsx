import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import LayoutSwapperPropsType from '../components/Layout';
import { getUsers } from './service/user';

interface DataType {
  key: React.Key;
  id: number;
  nameK: string;
  deposit: number;
  phone: string;
  email: string;
  level: number;
}

function UserManagement() {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "姓名",
      dataIndex: "nameK",
      key: "nameL",
    },
    {
      title: "钱包",
      dataIndex: "deposit",
      key: "deposit",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "等级",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "修改",
      dataIndex: "operation",
      key: "operation",
      render: () => (
        <Space
          size="middle"
          onClick={() => {
            lastSelectedRow && setmodalVisible(true);
          }}
        >
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      const number = String(selectedRowKeys[selectedRowKeys.length - 1]);
      setlastSelectedRow(number);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.nameK === "Disabled User", // Column configuration not to be checked
      name: record.nameK,
    }),
  };

  const [data, setdata] = useState([] as any);
  const [lastSelectedRow, setlastSelectedRow] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const [userData, setuserData] = useState({
    nameK: "",
    nameE: "",
    deposit: "",
    role: "",
    email: "",
    phone: "",
    level: "",
  });
  useEffect(() => {
    async function getData() {
      const result = await getUsers();
      setdata(result);
    }
    getData();
  }, []);

  function handleOk() {
    setmodalVisible(false);
  }
  function handleCancel() {
    setmodalVisible(false);
  }
  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <LayoutSwapperPropsType key="2">
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={onChange} />
      <Modal
        style={{ width: 1000, height: 800 }}
        visible={modalVisible}
        title={`유저 아이디: ${lastSelectedRow} 번`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Input placeholder="nameK" value={userData.nameK} disabled={true} />
        <br />
        <br />
        <Input placeholder="nameE" value={userData.nameE} disabled={true} />
        <br />
        <br />
        <Input placeholder="role" value={userData.role} disabled={true} />
        <br />
        <br />
        <Input placeholder="deposit" value={userData.deposit} disabled={true} />
        <br />
        <br />
        <Input
          disabled={true}
          placeholder="level"
          value={userData.level}
          onChange={(text) => {
            setuserData({ ...userData, level: text.target.value });
          }}
        />
        <br />
        <br />
        <Input placeholder="email" value={userData.email} disabled={true} />
        <br />
        <br />
        <Input placeholder="phone" value={userData.phone} disabled={true} />
      </Modal>
    </LayoutSwapperPropsType>
  );
}

export default UserManagement;
