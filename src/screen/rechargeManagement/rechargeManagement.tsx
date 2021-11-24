import { Button, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';

import LayoutSwapperPropsType from '../components/Layout';
import RechargeDescriptions from './components/RechargeDescriptions';
import UpdateForm from './components/UpdateForm';
import UserDescriptions from './components/UserDescriptions';
import { getAllRecharges, handleEditData } from './services/rechargeService';

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
      title: "예치금액",
      dataIndex: " price",
      key: "price",
      render: (_: any, row: any) => {
        return <div>{String(row.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</div>;
      },
    },
    {
      title: "충전여부",
      dataIndex: "is_charged",
      key: "is_charged",
      render: (_: any, row: any) => {
        return <div>{String(row.is_charged)}</div>;
      },
    },
    {
      title: "충전 일자",
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
  const [editOrderData, seteditOrderData] = useState({ userArr: [] } as any);
  const [isCharged, setIsCharged] = useState(true);

  useEffect(() => {
    async function asyncGetRecharges() {
      const result = await getAllRecharges();
      setdata(result);
    }
    asyncGetRecharges();
  }, []);

  async function handleEdit(row: any) {
    const result = await handleEditData(row.user_id, row);
    console.log("recharge handleEdit data: +++++++");
    console.log(result);
    console.log("recharge handleEdit data: +++++++");
    seteditOrderData(result);
    setIsCharged(result.recharge.is_charged);
    setvisible(true);
  }

  function handleOk() {
    setvisible(false);
  }
  function handleCancle() {
    setvisible(false);
  }

  console.log("recharge list data:=====");
  console.log(data);
  console.log("recharge list data:=====");

  console.log(editOrderData?.recharge?.is_charged);

  return (
    <LayoutSwapperPropsType key="4">
      <Table columns={columns} dataSource={data} />
      <Modal
        title="예치금 충전 정보"
        centered
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancle()}
        width={1500}
      >
        <RechargeDescriptions recharge={editOrderData.recharge} />
        <br />
        <br />
        <UserDescriptions user={editOrderData.user} />
        <br />
        <br />
        <UpdateForm isCharged={isCharged} setIsCharged={setIsCharged} />
      </Modal>
    </LayoutSwapperPropsType>
  );
}

export default RechargeManagement;
