import axios from 'axios';

export async function getUsers() {
  const token = `Bearer ${localStorage.getItem("token")}`;

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
  const token = `Bearer ${localStorage.getItem("token")}`;
  const response = await axios.put(
    "http://localhost:3000/order/working_orders",
    { updateUserDTO },
    {
      headers: { Authorization: token },
    }
  );
}