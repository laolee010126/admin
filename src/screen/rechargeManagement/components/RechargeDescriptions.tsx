import { Badge, Descriptions, Input } from 'antd';

type Recharge = {
  recharge: {
    id: number;
    user_id: number;
    price: number;
    is_charged: boolean;
    create_at: Date;
  };
};

function RechargeDescriptions({ recharge }: Recharge) {
  return (
    <Descriptions title="Recharge" bordered>
      <Descriptions.Item label="Recharge_ID">{recharge.id}</Descriptions.Item>
      <Descriptions.Item label="충전시간" span={2}>
        {recharge.create_at}
      </Descriptions.Item>
      <Descriptions.Item label="id" span={3}>
        {String(recharge.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
      </Descriptions.Item>
      <Descriptions.Item label="status" span={3}>
        <Badge status="processing" text={`${String(recharge.is_charged)}`} />
      </Descriptions.Item>
    </Descriptions>
  );
}

export default RechargeDescriptions;
