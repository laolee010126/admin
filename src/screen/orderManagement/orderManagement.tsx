import { Menu, Modal } from 'antd';
import React, { useState } from 'react';

import { AppstoreOutlined } from '@ant-design/icons';

import LayoutSwapperPropsType from '../components/Layout';
import OptionDescription from './components/OptionDescription';
import OrderTable from './components/OrderTable';
import PaymentDescription from './components/PaymentDescription';
import ProductDescription from './components/ProductDescription';
import ReceiverDescription from './components/ReceiverDescription';
import UserDescription from './components/UserDescripttion';
import { getAllOrders, getPaidOrders, getWorkingOrders } from './services/orderService';

function OrderManagement() {
  const [visible, setvisible] = useState(false);
  const [editOrderData, seteditOrderData] = useState({} as any);
  const [current, setCurrent] = useState("All");

  function handleClick(e: any) {
    console.log("click ", e);
    setCurrent(e.key);
  }

  function handleOk() {
    setvisible(false);
  }
  function handleCancle() {
    setvisible(false);
  }

  function MainScreen() {
    if (current === "All") {
      return (
        <OrderTable
          setvisible={setvisible}
          seteditOrderData={seteditOrderData}
          getInitialData={getAllOrders}
        />
      );
    } else if (current === "Working") {
      return (
        <OrderTable
          setvisible={setvisible}
          seteditOrderData={seteditOrderData}
          getInitialData={getWorkingOrders}
        />
      );
    } else if (current === "Paid") {
      return (
        <OrderTable
          setvisible={setvisible}
          seteditOrderData={seteditOrderData}
          getInitialData={getPaidOrders}
        />
      );
    }
    return <></>;
  }

  return (
    <LayoutSwapperPropsType key="3">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="All" icon={<AppstoreOutlined />}>
          주문내역 모두 보기
        </Menu.Item>
        <Menu.Item key="Working" icon={<AppstoreOutlined />}>
          작업중인 주무내역 모두 보기
        </Menu.Item>
        <Menu.Item key="Paid" icon={<AppstoreOutlined />}>
          결제 완료된 주무내역 모두 보기
        </Menu.Item>
      </Menu>
      <MainScreen />
      <Modal
        title="오더 정보"
        centered
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancle()}
        width={1500}
      >
        <OptionDescription optionObjectData={editOrderData.optionData} />
        <PaymentDescription paymentObjectData={editOrderData.paymentData} />
        <ReceiverDescription receiverObjectData={editOrderData.receiverData} />
        <ProductDescription productObjectData={editOrderData.productData} />
        <UserDescription userArrData={editOrderData.userData} />
      </Modal>
    </LayoutSwapperPropsType>
  );
}

export default OrderManagement;
