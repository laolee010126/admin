import { Descriptions } from 'antd';

interface OptionObjectData {
  optionObjectData: {
    id: number;
    order_type: string;
    tracking_number: string;
    warehouse_status: string;
    no_open_box: boolean;
    close_inspection: boolean;
    pallet_packaging: boolean;
    wood_packaging: boolean;
    sticker: boolean;
    send_quick: boolean;
    self_pickUp: boolean;
    nomal_delivery: boolean;
  };
}

const OptionDescription = ({ optionObjectData }: OptionObjectData) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Descriptions title="Option" bordered>
        <Descriptions.Item label="ID">{optionObjectData.id}</Descriptions.Item>
        <Descriptions.Item label="tracking_number" span={2}>
          {optionObjectData.tracking_number}
        </Descriptions.Item>
        <Descriptions.Item label="warehouse_status">
          {optionObjectData.warehouse_status}
        </Descriptions.Item>
        <Descriptions.Item label="no_open_box">{optionObjectData.no_open_box}</Descriptions.Item>
        <Descriptions.Item label="close_inspection">
          {optionObjectData.close_inspection}
        </Descriptions.Item>
        <Descriptions.Item label="pallet_packaging">
          {optionObjectData.pallet_packaging}
        </Descriptions.Item>
        <Descriptions.Item label="wood_packaging">
          {optionObjectData.wood_packaging}
        </Descriptions.Item>
        <Descriptions.Item label="sticker">{optionObjectData.sticker}</Descriptions.Item>
        <Descriptions.Item label="send_quick">{optionObjectData.send_quick}</Descriptions.Item>
        <Descriptions.Item label="self_pickUp">{optionObjectData.self_pickUp}</Descriptions.Item>
        <Descriptions.Item label="nomal_delivery">
          {optionObjectData.nomal_delivery}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default OptionDescription;
