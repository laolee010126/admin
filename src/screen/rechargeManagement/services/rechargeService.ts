import axios from 'axios';

import { getUserById } from '../../userManagement/service/user';

const token = `Bearer ${localStorage.getItem("token")}`;
type Recharge = {
  id: number;
  user_id: number;
  price: number;
  is_charged: boolean;
  create_at: Date;
};

type User = {
  id: number;
  nameK: string;
  phone: string;
  email: string;
};

export async function handleEditData(
  user_id: number,
  recharge: Recharge
): Promise<{ user: User; recharge: Recharge }> {
  //user data 받아오기
  const user = await getUserById(user_id);
  return { user, recharge };
}

export async function getAllRecharges(): Promise<Recharge[]> {
  const { data } = await axios.get("http://localhost:3000/depositRecharge", {
    headers: { Authorization: token },
  });

  const recharges: Recharge[] = data.map((element: Recharge) => ({
    key: element.id,
    ...element,
    create_at: new Date(element.create_at).toLocaleString(),
  }));

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

export async function updateDepositToIsChargedTrue(recharge_id: number) {
  const response = await axios.put(
    `http://localhost:3000/depositRecharge/${recharge_id}`,
    { is_charged: true },
    { headers: { Authorization: token } }
  );
  return response;
}

export async function getNeedCheckRecharges() {
  const { data } = await axios.get(`http://localhost:3000/depositRecharge/need_charge`, {
    headers: { Authorization: token },
  });
  return data;
}
