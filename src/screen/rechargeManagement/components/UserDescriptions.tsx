import { Descriptions, Input } from 'antd';

type User = {
  user: {
    id: number;
    nameK: string;
    phone: string;
    email: string;
  };
};

function UserDescriptions({ user }: User) {
  return (
    <Descriptions title="User" bordered>
      <Descriptions.Item label="User_ID" span={1.5}>
        {user.id}
      </Descriptions.Item>
      <Descriptions.Item label="이름" span={1.5}>
        {user.nameK}
      </Descriptions.Item>
      <Descriptions.Item label="핸드폰" span={1.5}>
        {user.phone}
      </Descriptions.Item>
      <Descriptions.Item label="이메일" span={1.5}>
        {user.email}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default UserDescriptions;
