import axios from 'axios';

export async function getTodayUserData() {
  const result = await axios.get("http://localhost:3000/user/new/today", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result.data;
}

export async function getTodayOrderData() {
  const result = await axios.get("http://localhost:3000/order/new/today", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result.data;
}

export async function getTodayDepositRechargeData() {
  const result = await axios.get("http://localhost:3000/depositRecharge/new/today", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result.data;
}

export async function getTodayNodataData() {
  const result = await axios.get("http://localhost:3000/nodata/new/today", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result.data;
}

export async function getDashboardData() {
  const todayUsers = await getTodayUserData();
  const todayOrders = await getTodayOrderData();
  const todayDepositRecharges = await getTodayDepositRechargeData();
  const todayNodata = await getTodayNodataData();
  const TodayData = {
    todayUsers: todayUsers.length as number,
    todayOrders: todayOrders.length as number,
    todayDepositRecharges: todayDepositRecharges.length as number,
    todayNodata: todayNodata.length as number,
  };
  return TodayData;
}
