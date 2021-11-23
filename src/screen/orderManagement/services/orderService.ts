import axios from 'axios';

const token = `Bearer ${localStorage.getItem("token")}`;

export async function getAllOrders() {
  const { data } = await axios.get("http://localhost:3000/order/all_orders", {
    headers: { Authorization: token },
  });
  let result = [];
  for (const order in data) {
    const nowOrder = data[order];

    const newOrder = {
      key: nowOrder.id,
      id: nowOrder.id,
      user_id: nowOrder.user_id,
      product_id: nowOrder.product_id,
      receiver_id: nowOrder.receiver_id,
      order_type: nowOrder.order_type,
      tracking_number: nowOrder.tracking_number,
      warehouse_status: nowOrder.warehouse_status,
      paid: nowOrder.paid ? "O" : "X",
      auto_charge: nowOrder.auto_charge ? "O" : "X",
      create_at: nowOrder.create_at,
    };
    result.push(newOrder);
  }

  return result;
}

export async function getUesrById(id: number) {
  const { data } = await axios.get(`http://localhost:3000/user/${id}`, {
    headers: { Authorization: token },
  });
  return data;
}

export async function getProductById(id: number) {
  const { data } = await axios.get(`http://localhost:3000/product/${id}`, {
    headers: { Authorization: token },
  });
  return data;
}

export async function getReceiverById(id: number) {
  const { data } = await axios.get(`http://localhost:3000/receiver/${id}`, {
    headers: { Authorization: token },
  });
  return data;
}

export async function getOrderById(id: number) {
  const { data } = await axios.get(`http://localhost:3000/order/${id}`, {
    headers: { Authorization: token },
  });
  return data;
}
