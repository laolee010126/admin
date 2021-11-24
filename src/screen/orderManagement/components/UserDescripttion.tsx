import { Descriptions } from 'antd';

interface UserArrData {
  userArrData: {
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

const UserDescription = ({ userArrData }: UserArrData) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Descriptions title="User" bordered>
        <Descriptions.Item label="ID">{userArrData.id}</Descriptions.Item>
        <Descriptions.Item label="nameK">{userArrData.nameK}</Descriptions.Item>
        <Descriptions.Item label="nameE">{userArrData.nameE}</Descriptions.Item>
        <Descriptions.Item label="username">{userArrData.username}</Descriptions.Item>
        <Descriptions.Item label="level">{userArrData.level}</Descriptions.Item>
        <Descriptions.Item label="role">{userArrData.role}</Descriptions.Item>
        <Descriptions.Item label="deposit" span={3}>
          {userArrData.deposit}
        </Descriptions.Item>
        <Descriptions.Item label="businessRegistration" span={3}>
          {userArrData.businessRegistration}
        </Descriptions.Item>
        <Descriptions.Item label="phone">{userArrData.phone}</Descriptions.Item>
        <Descriptions.Item label="email">{userArrData.email}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserDescription;
