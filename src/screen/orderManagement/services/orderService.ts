import axios from 'axios';

import { boolToOX } from '../../../util/bollToOX';

const token = `Bearer ${localStorage.getItem("token")}`;
interface Order {
  key: number;
  id: number;
  user_id: number;
  product_id: number;
  receiver_id: number;
  order_type: string;
  tracking_number: string;
  warehouse_status: string;
  paid: string;
  auto_charge: string;
  create_at: Date;
}
interface OrderDetail {
  id: number;
  create_at: string;
  updated_at: string;
  user_id: number;
  product_id: number;
  receiver_id: number;
  order_type: string;
  tracking_number: string;
  warehouse_status: string;
  paid: boolean;
  auto_charge: boolean;
  no_open_box: boolean;
  close_inspection: boolean;
  pallet_packaging: boolean;
  wood_packaging: boolean;
  sticker: boolean;
  send_quick: boolean;
  self_pickUp: boolean;
  nomal_delivery: boolean;
  product: {
    id: number;
    create_at: string;
    updated_at: string;
    user_id: number;
    productBuyUrl: string;
    customsCategory: string;
    productName: string;
    price: number;
    quantity: number;
    sum: number;
    color: string;
    size: string;
    productImgUrl: string;
  };
  receiver: {
    id: number;
    create_at: string;
    updated_at: string;
    user_id: number;
    nameK: string;
    nameE: string;
    phone: string;
    address: string;
    businessRegistration: string;
    buisnessName: string;
    buisnessPhone: string;
    buisnessAddress: string;
  };
  user: {
    id: number;
    create_at: string;
    updated_at: string;
    nameK: string;
    nameE: string;
    username: string;
    deposit: number;
    level: number;
    role: string;
    businessRegistration: string;
    email: string;
    phone: string;
  };
}

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
      paid: boolToOX(nowOrder.paid),
      auto_charge: boolToOX(nowOrder.auto_charge),
      create_at: nowOrder.create_at,
    };
    result.push(newOrder);
  }

  return result;
}

export async function getOrderById(id: number) {
  const { data } = await axios.get(`http://localhost:3000/order/one/${id}`, {
    headers: { Authorization: token },
  });
  return data;
}

export async function handleEditData(order: Order) {
  const orderDetail: OrderDetail = await getOrderById(order.id);
  const newOrder = {
    user: orderDetail.user,
    receiver: orderDetail.receiver,
    product: orderDetail.product,
    option: {
      id: orderDetail.id,
      order_type: orderDetail.order_type,
      tracking_number: orderDetail.tracking_number,
      warehouse_status: orderDetail.warehouse_status,
      no_open_box: boolToOX(orderDetail.no_open_box),
      close_inspection: boolToOX(orderDetail.close_inspection),
      pallet_packaging: boolToOX(orderDetail.pallet_packaging),
      wood_packaging: boolToOX(orderDetail.wood_packaging),
      sticker: boolToOX(orderDetail.sticker),
      send_quick: boolToOX(orderDetail.send_quick),
      self_pickUp: boolToOX(orderDetail.self_pickUp),
      nomal_delivery: boolToOX(orderDetail.nomal_delivery),
    },
    payment: {
      paid: boolToOX(orderDetail.paid),
      auto_charge: boolToOX(orderDetail.auto_charge),
    },
  };
  const { user, receiver, product, option, payment } = newOrder;
  const userData = user;
  const receiverData = receiver;
  const productData = product;
  const optionData = option;
  const paymentData = payment;

  return { userData, receiverData, productData, optionData, paymentData };
}
