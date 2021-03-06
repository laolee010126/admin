import axios from 'axios';

const token = `Bearer ${localStorage.getItem("token")}`;
type User = {
  id: number;
  nameK: string;
  phone: string;
  email: string;
};
export async function getUsers() {
  const { data } = await axios.get("http://localhost:3000/user", {
    headers: { Authorization: token },
  });

  let response = [];
  for (const id in data) {
    const user = data[id];
    response.push({
      key: id,
      id,
      nameK: user.nameK,
      deposit: user.deposit,
      phone: user.phone,
      email: user.email,
      level: user.level,
    });
  }
  return response;
}

export async function updateUser(id: number, updateUserDTO: any) {
  const response = await axios.put(
    "http://localhost:3000/order/working_orders",
    { updateUserDTO },
    {
      headers: { Authorization: token },
    }
  );
}

export async function handleEditData(user: any) {
  const { data } = await axios.get(`http://localhost:3000/user/${user.id}`, {
    headers: { Authorization: token },
  });
  return data;
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await axios.get(`http://localhost:3000/user/${id}`, {
    headers: { Authorization: token },
  });
  return data;
}
