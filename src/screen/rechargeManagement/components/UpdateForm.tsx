import { Radio } from 'antd';
import { useEffect, useState } from 'react';

interface IsCharged {
  isCharged: boolean;
  setIsCharged: (value: any) => void;
}

function UpdateForm({ isCharged, setIsCharged }: IsCharged) {
  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setIsCharged(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={Boolean(isCharged)}>
      <Radio value={false}>미확인</Radio>
      <Radio value={true}>확인</Radio>
    </Radio.Group>
  );
}

export default UpdateForm;
