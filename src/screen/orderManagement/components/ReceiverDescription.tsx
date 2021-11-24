import { Descriptions } from 'antd';

interface ReceiverObjectData {
  receiverObjectData: {
    id: number;
    user_id: number;
    nameK: string;
    nameE: string;
    phone: string;
    address: string;
    businessRegistration: string;
    buisnessName: string;
    buisnessPhone: string;
    buisnessAddress: string;
    create_at: string;
    updated_at: string;
  };
}

const ReceiverDescription = ({ receiverObjectData }: ReceiverObjectData) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Descriptions title="Receiver" bordered>
        <Descriptions.Item label="ID">{receiverObjectData.id}</Descriptions.Item>
        <Descriptions.Item label="user_id">{receiverObjectData.user_id}</Descriptions.Item>
        <Descriptions.Item label="nameK">{receiverObjectData.nameK}</Descriptions.Item>
        <Descriptions.Item label="nameE">{receiverObjectData.nameE}</Descriptions.Item>
        <Descriptions.Item label="address">{receiverObjectData.address}</Descriptions.Item>
        <Descriptions.Item label="phone">{receiverObjectData.phone}</Descriptions.Item>
        <Descriptions.Item label="businessRegistration">
          {receiverObjectData.businessRegistration}
        </Descriptions.Item>
        <Descriptions.Item label="buisnessName">
          {receiverObjectData.buisnessName}
        </Descriptions.Item>
        <Descriptions.Item label="buisnessPhone">
          {receiverObjectData.buisnessPhone}
        </Descriptions.Item>
        <Descriptions.Item label="buisnessAddress">
          {receiverObjectData.buisnessAddress}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ReceiverDescription;
