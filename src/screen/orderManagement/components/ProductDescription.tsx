import { Descriptions } from 'antd';

interface ProductObjectData {
  productObjectData: {
    id: number;
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
    create_at: string;
    updated_at: string;
  };
}

const ProductDescription = ({ productObjectData }: ProductObjectData) => {
  return (
    <div style={{ marginBottom: 30 }}>
      <Descriptions title="Product" bordered>
        <Descriptions.Item label="productName">{productObjectData.productName}</Descriptions.Item>
        <Descriptions.Item label="ID">{productObjectData.id}</Descriptions.Item>
        <Descriptions.Item label="user_id">{productObjectData.user_id}</Descriptions.Item>
        <Descriptions.Item label="customsCategory">
          {productObjectData.customsCategory}
        </Descriptions.Item>
        <Descriptions.Item label="color">{productObjectData.color}</Descriptions.Item>
        <Descriptions.Item label="size">{productObjectData.size}</Descriptions.Item>
        <Descriptions.Item label="price" span={3}>
          {productObjectData.price}
        </Descriptions.Item>
        <Descriptions.Item label="quantity" span={3}>
          {productObjectData.quantity}
        </Descriptions.Item>
        <Descriptions.Item label="sum" span={3}>
          {productObjectData.sum}
        </Descriptions.Item>
        <Descriptions.Item label="productBuyUrl">
          {productObjectData.productBuyUrl}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProductDescription;
