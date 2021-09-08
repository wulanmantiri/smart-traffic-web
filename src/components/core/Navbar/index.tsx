import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { navbarItems } from 'routes/navigation';

const Navbar: FC = () => (
  <nav className="bg-squid fixed w-screen">
    <div className="flex items-center h-12 px-4 sm:px-12">
      <div className="relative flex flex-1 items-center justify-between">
        <Link to="/">
          <div className="flex flex-col items-center">
            <p className="text-white text-sm">Smart Traffic</p>
            <p className="text-gray-300 text-xs">Management System</p>
          </div>
        </Link>
        <div className="flex space-x-4">
          {navbarItems.map(nav => (
            <Link
              to={nav.path}
              key={nav.path}
              className={`${
                window.location.pathname === nav.path
                  ? 'text-primary-100'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              {nav.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
