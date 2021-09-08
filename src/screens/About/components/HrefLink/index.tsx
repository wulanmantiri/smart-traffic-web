import React, { FC } from 'react';

export const bigLinkStyles =
  'flex px-8 py-3 justify-center tracking-wide text-base font-medium text-lg rounded-md shadow-md';

const HrefLink: FC<{ href: string }> = ({ href, children }) => (
  <a href={href} target="_blank" className="text-blue-500 hover:text-blue-700">
    {children}
  </a>
);

export default HrefLink;
