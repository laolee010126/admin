import './numberCard.css';

import { Card } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

function NumberCard({ title, number }: propsType) {
  return (
    <div
      className="numberCard"
      style={{
        display: "inline-block",
        padding: 50,
        borderStyle: "solid",
        margin: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p className="title">{title || "No Title"}</p>
      <p className="number">
        <CountUp start={0} end={number} duration={2.75} useEasing separator="," />
      </p>
    </div>
  );
}

type propsType = {
  title: string;
  number: number;
};

export default NumberCard;
