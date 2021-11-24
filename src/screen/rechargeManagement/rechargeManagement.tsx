import { Button, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import LayoutSwapperPropsType from '../components/Layout';
import { handleEditData } from './services/rechargeService';

function RechargeManagement() {
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

  useEffect(() => {
    async function asyncGetRecharges() {
      // setdata(await getAllOrders());
    }
    asyncGetRecharges();
  }, []);

  async function handleEdit(order: any) {
    const result = await handleEditData();
    seteditOrderData(result);
    setvisible(true);
  }
  const [editOrderData, seteditOrderData] = useState({ userArr: [] } as any);

  function handleOk() {
    setvisible(false);
  }
  function handleCancle() {
    setvisible(false);
  }

  return (
    <LayoutSwapperPropsType key="4">
      <Table columns={columns} dataSource={data} />
      <Modal
        title="오더 정보"
        centered
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancle()}
        width={1500}
      >
        <div></div>
      </Modal>
    </LayoutSwapperPropsType>
  );
}

export default RechargeManagement;
