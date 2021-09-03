import React, { FC } from 'react';
import Navbar from '../Navbar';

const Layout: FC = ({ children }) => (
  <div>
    <Navbar />
    <div className="px-4 pt-20 pb-8 bg-gray-50 sm:px-10">{children}</div>
  </div>
);

export default Layout;
