import { Descriptions } from 'antd';

interface UserData {
  userData: {
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

const UserDescription = ({ userData }: UserData) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Descriptions title="User" bordered>
        <Descriptions.Item label="ID">{String(userData.id)}</Descriptions.Item>
        <Descriptions.Item label="nameK">{userData.nameK}</Descriptions.Item>
        <Descriptions.Item label="nameE">{userData.nameE}</Descriptions.Item>
        <Descriptions.Item label="username">{userData.username}</Descriptions.Item>
        <Descriptions.Item label="level">{userData.level}</Descriptions.Item>
        <Descriptions.Item label="role">{userData.role}</Descriptions.Item>
        <Descriptions.Item label="deposit" span={3}>
          {userData.deposit}
        </Descriptions.Item>
        <Descriptions.Item label="businessRegistration" span={3}>
          {userData.businessRegistration}
        </Descriptions.Item>
        <Descriptions.Item label="phone">{userData.phone}</Descriptions.Item>
        <Descriptions.Item label="email">{userData.email}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserDescription;
