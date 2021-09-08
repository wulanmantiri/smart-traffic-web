import React, { FC } from 'react';

const InfoCard: FC<{ title: string }> = ({ title, children }) => (
  <div className="bg-white shadow-xl rounded-xl p-8 space-y-4">
    <p className="text-xl tracking-wide text-gray-500">{title}</p>
    {children}
  </div>
);

export default InfoCard;
