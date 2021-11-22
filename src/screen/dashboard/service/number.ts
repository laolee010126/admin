import axios from 'axios';

type NumberType = {
  title: string;
  number: number;
};

export async function getUserData() {
  const result = await axios.get("http://localhost:3000/user", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result.data;
}

export async function getOrderData() {
  const result = await axios.get("http://localhost:3000/order/working_orders", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result.data;
}

export async function getDepositRechargeData() {
  const result = await axios.get("http://localhost:3000/depositRecharge/need_charge", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result.data;
}

export async function getData() {
  const users = await getUserData();
  const orders = await getOrderData();
  const depositRecharges = await getDepositRechargeData();
  console.log("asdf");

  return [
    { title: "User", number: users.length },
    { title: "Order", number: orders.length },
    { title: "Deposit", number: depositRecharges.length },
  ];
}
