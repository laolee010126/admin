import './numberCard.css';

import { Card } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

function NumberCard({ color, title, number }: propsType) {
  return (
    <Card className="numberCard" bordered={true} bodyStyle={{ padding: 10 }}>
      <div className="content">
        <p className="title">{title || "No Title"}</p>
        <p className="number">
          <CountUp start={0} end={number} duration={2.75} useEasing separator="," />
        </p>
      </div>
    </Card>
  );
}

type propsType = {
  color: string;
  title: string;
  number: number;
};

export default NumberCard;
