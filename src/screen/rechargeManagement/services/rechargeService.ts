import axios from 'axios';

import { getUserById } from '../../userManagement/service/user';

const token = `Bearer ${localStorage.getItem("token")}`;

interface Recharge {
  id: number;
  user_id: number;
  price: number;
  is_charged: boolean;
  create_at: Date;
}

export async function handleEditData(user_id: number, recharge: Recharge) {
  const user = await getUserById(user_id);
  return { user, recharge };
}

export async function getAllRecharges(): Promise<Recharge[]> {
  const { data } = await axios.get("http://localhost:3000/depositRecharge", {
    headers: { Authorization: token },
  });

  const recharges: Recharge[] = data.map((_: Recharge) => ({ key: _.id, ..._ }));
  console.log("≠=====");
  console.log(recharges);
  console.log("≠=====");
  return recharges;
}

export async function getAllNeedRecharges() {
  const { data } = await axios.get("http://localhost:3000/depositRecharge/need_charege", {
    headers: { Authorization: token },
  });

  const recharges: Recharge[] = data.map((_: Recharge) => ({ key: _.id, ..._ }));
  return recharges;
}

export async function addUserDeposit(user_id: number, deposit: number) {
  const response = await axios.post(
    `http://localhost:3000/user/${user_id}/add_deposit`,
    { deposit },
    { headers: { Authorization: token } }
  );
  return response;
}
