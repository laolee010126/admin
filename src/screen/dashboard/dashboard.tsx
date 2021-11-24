import 'antd/dist/antd.css';
import './dashboard.css';

import React, { useEffect, useState } from 'react';

import LayoutSwapperPropsType from '../components/Layout';
import NumberCard from './components/NumberCard/index';
import { getDashboardData } from './service/number';

type DashBoardDataType = {
  todayUsers: number;
  todayOrders: number;
  todayDepositRecharges: number;
  todayNodata: number;
};

function DashBoard() {
  const [dashBoardData, setDashBoardData] = useState({} as DashBoardDataType);

  useEffect(() => {
    const getNumbers = async () => {
      const result = await getDashboardData();
      setDashBoardData(result);
    };
    getNumbers();
  }, []);

  return (
    <LayoutSwapperPropsType key="1">
      <NumberCard title="NewUsers" number={dashBoardData.todayUsers} />
      <NumberCard title="NewOrders" number={dashBoardData.todayOrders} />
      <NumberCard title="NewDeposits" number={dashBoardData.todayDepositRecharges} />
      <NumberCard title="NewNodata" number={dashBoardData.todayNodata} />
    </LayoutSwapperPropsType>
  );
}

export default DashBoard;
