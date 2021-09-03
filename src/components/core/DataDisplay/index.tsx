import React, { FC } from 'react';
import { DataDisplayProps } from './types';

const DataDisplay: FC<DataDisplayProps> = ({ title, items }) => (
  <div className="bg-white shadow sm:rounded-md">
    {title ? (
      <div className="px-2 py-3 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
    ) : null}

    <div className="border-t border-gray-100">
      <dl>
        {items.map((item, i) => (
          <div
            className={`${
              i % 2 === 0 ? 'bg-gray-100' : 'bg-white'
            } px-2 py-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6`}
            key={item.label}
          >
            <dt
              className={`text-sm ${
                item.labelBold ? 'font-medium text-gray-900' : 'text-gray-500'
              }`}
            >
              {item.label}
            </dt>
            <dd className="text-sm text-gray-900 text-right">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

export default DataDisplay;
