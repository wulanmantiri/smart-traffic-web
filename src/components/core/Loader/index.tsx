import React, { FC } from 'react';

const Loader: FC<{ color?: string }> = ({ color }) => (
  <div
    className={`animate-spin rounded-full h-8 w-8 border-b-2 border-${
      color || 'gray-100'
    }
  `}
  ></div>
);

export default Loader;
