import React, { FC } from 'react';
import './index.css';
import { TrafficLightProps } from './types';

const TrafficLight: FC<TrafficLightProps> = ({ currentLight }) => (
  <div className="trafficlight flex justify-evenly items-center rounded-xl w-32 h-12 border-2 border-solid border-gray-600">
    {['red', 'yellow', 'green'].map(color => (
      <div
        className={`${color} w-8 h-8 transition-all duration-500 ${
          currentLight === color ? '' : 'opacity-25'
        }`}
        key={`trafficlight${color}`}
      />
    ))}
  </div>
);

export default TrafficLight;
