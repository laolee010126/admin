import { Descriptions } from 'antd';

interface PaymentObjectData {
  paymentObjectData: {
    paid: boolean;
    auto_charge: boolean;
  };
}

const PaymentDescription = ({ paymentObjectData }: PaymentObjectData) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Descriptions title="Payment" bordered>
        <Descriptions.Item label="paid">{paymentObjectData.paid}</Descriptions.Item>
        <Descriptions.Item label="auto_charge">{paymentObjectData.auto_charge}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default PaymentDescription;
