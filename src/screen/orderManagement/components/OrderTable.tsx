import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { SearchOutlined } from '@ant-design/icons';

import { handleEditData } from '../services/orderService';

type Props = {
  setvisible: (newState: any) => void;
  seteditOrderData: (newState: any) => void;
  getInitialData: () => any;
};

function OrderTable({ setvisible, seteditOrderData, getInitialData }: Props) {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "유저 아이디",
      dataIndex: "user_id",
      key: "user_id",
      ...getColumnSearchProps("user_id"),
    },
    {
      title: "상품",
      dataIndex: " product_id",
      key: "product_id",
      render: (_: any, row: any) => {
        return <div>{row.product_id}</div>;
      },
    },
    {
      title: "수취인",
      dataIndex: "receiver_id",
      key: "receiver_id",
    },
    {
      title: "주문 타입",
      dataIndex: "order_type",
      key: "order_type",
    },
    {
      title: "트래킹넘버",
      dataIndex: "tracking_number",
      key: "tracking_number",
    },
    {
      title: "배송상태",
      dataIndex: "warehouse_status",
      key: "warehouse_status",
    },
    {
      title: "결제 여부",
      dataIndex: "paid",
      key: "paid",
    },
    {
      title: "예치금 자동 계산",
      dataIndex: "auto_charge",
      key: "auto_charge",
    },
    {
      title: "주문 일자",
      dataIndex: "create_at",
      key: "create_at",
      ...getColumnSearchProps("user_id"),
      // render: (_: any, row: any) => {
      //   console.log(row);
      //   const date = new Date(row.create_at).toLocaleString();
      //   return <div>{date}</div>;
      // },
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
        console.log(record);
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

  async function handleEdit(order: any) {
    const result = await handleEditData(order);
    seteditOrderData(result);
    setvisible(true);
  }

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default OrderTable;
