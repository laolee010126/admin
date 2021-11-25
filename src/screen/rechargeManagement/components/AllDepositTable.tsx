import { Button, Input, Modal, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { SearchOutlined } from '@ant-design/icons';

import {
    addUserDeposit, getAllRecharges, handleEditData, updateDepositToIsChargedTrue
} from '../services/rechargeService';
import RechargeDescriptions from './RechargeDescriptions';
import UpdateForm from './UpdateForm';
import UserDescriptions from './UserDescriptions';

interface RechargeType {
  id: number;
  user_id: number;
  price: number;
  is_charged: boolean;
  create_at: Date;
}

function AllDepositTable() {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "유저 아이디",
      dataIndex: "user_id",
      key: "user_id",
      width: "10%",
      ...getColumnSearchProps("user_id"),
    },
    {
      title: "예치금액",
      dataIndex: " price",
      key: "price",
      width: "15%",
      render: (_: any, row: RechargeType) => {
        return <div>{String(row.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</div>;
      },
    },
    {
      title: "충전여부",
      dataIndex: "is_charged",
      key: "is_charged",
      width: "10%",
      render: (_: any, row: RechargeType) => {
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
      render: (_: any, row: RechargeType) => {
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
      onFilter: (value: any, record: any) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : "",
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

  async function handleEdit(row: RechargeType) {
    const result = await handleEditData(row.user_id, row);
    //Edit데이터 가져오기
    seteditOrderData(result);
    //Edit 확인여부 데이터 전송
    setIsCharged(result.recharge.is_charged);
    //Modal 보이게 하기
    setvisible(true);
  }

  /**
   * @param id 예치금 식별 인덱스
   * @param is_charged 예치금 충전확인 여부
   */
  async function handleOk(recharge_id: number, is_charged: boolean) {
    const targetRechargeIndex = data.findIndex((_) => _.id === recharge_id);
    const targetRecharge = data[targetRechargeIndex];
    try {
      /**
       * 계좌이체 확인결과 충전확인이 되서 관리자가 충전 확인을 누를 시
       */
      if (targetRecharge?.user_id && is_charged && !data[targetRechargeIndex].is_charged) {
        //유저 예치금 추가
        await addUserDeposit(targetRecharge.user_id, targetRecharge.price);
        //예치금 충전 확인으로 변경
        await updateDepositToIsChargedTrue(recharge_id);
        //예치금 리스트 변경
        setdata((prev: RechargeType[]) => {
          let newData = [...prev];
          newData[targetRechargeIndex] = {
            ...newData[targetRechargeIndex],
            is_charged: is_charged,
          };
          return newData;
        });
      } else {
        console.log("이미 충전됌 ");
      }
      setvisible(false);
    } catch {}
  }

  function handleCancle() {
    setvisible(false);
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [visible, setvisible] = useState(false);
  const [data, setdata] = useState([] as RechargeType[]);
  const [editOrderData, seteditOrderData] = useState([] as any);
  const [isCharged, setIsCharged] = useState(true);

  //초기 예치금 데이터 로딩
  useEffect(() => {
    async function asyncGetRechargesData() {
      const result = await getAllRecharges();
      setdata(result);
    }
    asyncGetRechargesData();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="예치금 충전 정보"
        centered
        visible={visible}
        onOk={() => {
          handleOk(editOrderData.recharge.id, isCharged);
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
    </>
  );
}

export default AllDepositTable;
