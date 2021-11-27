import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { SearchOutlined } from '@ant-design/icons';

import { handleEditData } from '../service/user';

type Props = {
  setvisible: (newState: any) => void;
  seteditUserData: (newState: any) => void;
  getInitialData: () => any;
};

function UserTable({ setvisible, seteditUserData, getInitialData }: Props) {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "8%",
    },
    {
      title: "姓名",
      dataIndex: "nameK",
      key: "nameK",
      width: "10%",
      ...getColumnSearchProps("nameK"),
    },
    {
      title: "钱包",
      dataIndex: "deposit",
      key: "deposit",
      width: "20%",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      width: "15%",
    },
    {
      title: "等级",
      dataIndex: "level",
      key: "level",
      width: "8%",
    },
    {
      title: "edit",
      render: (_: any, row: any) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                handleEdit(row);
              }}
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];
  /**
   *  Search 관련 로직
   * @param dataIndex
   * @returns
   */
  function getColumnSearchProps(dataIndex: string) {
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value: any, record: any) => {
        return record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : "";
      },
      render: (text: any) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys: any, confirm: any, dataIndex: any) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters: any) {
    clearFilters();
    setSearchText("");
  }

  const [data, setdata] = useState([] as any);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    async function asyncGetOrders() {
      setdata(await getInitialData());
    }
    asyncGetOrders();
  }, []);

  async function handleEdit(user: any) {
    const result = await handleEditData(user);
    console.log("시발");
    console.log(result);
    seteditUserData(result);
    setvisible(true);
  }

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default UserTable;
