import 'antd/dist/antd.css';
import './dashboard.css';

import React, { useEffect, useState } from 'react';

import LayoutSwapperPropsType from '../components/Layout';
import NumberCard from './components/NumberCard/index';
import { getData } from './service/number';

function DashBoard() {
  const [numbers, setnumbers] = useState([] as any);

  useEffect(() => {
    const getNumbers = async () => {
      const result = await getData();
      setnumbers(result);
    };
    getNumbers();
  }, []);

  return (
    <LayoutSwapperPropsType key="1">
      {/* {numbers.map((item, key) => {
        return <NumberCard item={item} key={key} />;
      })} */}
    </LayoutSwapperPropsType>
  );
}

export default DashBoard;
