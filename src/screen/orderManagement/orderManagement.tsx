import { Button, Card, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import LayoutSwapperPropsType from '../components/Layout';
import { getAllOrders, getUesrById } from './services/orderService';

interface Order {
  key: number;
  id: number;
  user_id: number;
  product_id: number;
  receiver_id: number;
  order_type: string;
  tracking_number: string;
  warehouse_status: string;
  paid: string;
  auto_charge: string;
  create_at: Date;
}

function OrderManagement() {
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
  const [visible, setvisible] = useState(false);
  const [data, setdata] = useState([] as any);
  const [editOrderData, seteditOrderData] = useState({} as any);

  useEffect(() => {
    async function a() {
      setdata(await getAllOrders());
    }
    a();
  }, []);

  async function handleEdit(order: Order) {
    const user = await getUesrById(order.user_id);
    const product = await seteditOrderData(order);
    const option = await setvisible(true);
  }

  function handleOk() {
    console.log("goeo");

    setvisible(false);
  }
  function handleCancle() {
    setvisible(false);
  }
  return (
    <LayoutSwapperPropsType key="3">
      <Table columns={columns} dataSource={data} />
      <Modal
        title="오더 정보"
        centered
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancle()}
        width={1500}
      >
        <Card title="User" style={{ width: 300, height: 500, display: "inline-block", margin: 30 }}>
          <p>{editOrderData.id}</p>
        </Card>
        <Card
          title="Product"
          style={{ width: 300, height: 500, display: "inline-block", margin: 30 }}
        >
          <p>{editOrderData.product_id}</p>
        </Card>
        <Card
          title="Receiver"
          style={{ width: 300, height: 500, display: "inline-block", margin: 30 }}
        >
          <p>{editOrderData.product_id}</p>
        </Card>
        <Card
          title="Option"
          style={{ width: 300, height: 500, display: "inline-block", margin: 30 }}
        >
          <p>{editOrderData.product_id}</p>
        </Card>
        <Card
          title="Payment"
          style={{ width: 300, height: 500, display: "inline-block", margin: 30 }}
        >
          <p>{editOrderData.product_id}</p>
        </Card>
      </Modal>
    </LayoutSwapperPropsType>
  );
}

export default OrderManagement;
