import { Button, Modal, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import LayoutSwapperPropsType from '../components/Layout';
import RechargeDescriptions from './components/RechargeDescriptions';
import UpdateForm from './components/UpdateForm';
import UserDescriptions from './components/UserDescriptions';
import { addUserDeposit, getAllRecharges, handleEditData } from './services/rechargeService';

const token = `Bearer ${localStorage.getItem("token")}`;
interface RechargeType {
  id: number;
  user_id: number;
  price: number;
  is_charged: boolean;
  create_at: Date;
}
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
      render: (_: any, row: any) => {
        const date = new Date(row.create_at).toLocaleString();
        return <div>{date}</div>;
      },
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
  const [data, setdata] = useState([] as RechargeType[]);
  const [editOrderData, seteditOrderData] = useState([] as any);
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

  /**
   * @param id 예치금 식별 인덱스
   * @param is_charged 예치금 충전확인 여부
   */
  async function handleOk(recharge_id: number, is_charged: boolean) {
    const targetRecharege = data.find((_) => _.id === recharge_id);
    const targetRechargeIndex = data.findIndex((_) => _.id === recharge_id);
    try {
      /**
       * 계좌이체 확인결과 충전확인이 되서 관리자가 충전 확인을 누를 시
       */
      if (targetRecharege?.user_id && is_charged) {
        //유저 예치금 추가
        await addUserDeposit(targetRecharege.user_id, targetRecharege.price);
        //예치금 충전 확인으로 변경
        await axios.put(
          `http://localhost:3000/depositRecharge/${recharge_id}`,
          { is_charged },
          { headers: { Authorization: token } }
        );
        //예치금 리스트 변경
        setdata((prev: RechargeType[]) => {
          let newData = [...prev];
          newData[targetRechargeIndex] = { ...newData[targetRechargeIndex], is_charged };
          return newData;
        });
      }
      setvisible(false);
    } catch {}
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
        onOk={() => {
          if (!editOrderData.recharge.is_charged) {
            handleOk(editOrderData.recharge.id, isCharged);
          } else {
            console.log("이미 충전 됐어 이년아");
            handleCancle();
          }
        }}
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
