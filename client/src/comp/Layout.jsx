import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBar from './SideBar';
const Layout = () => {
  return (
    <div className="w-4/5 min-h-screen mx-auto flex justify-between">
      <div className="w-1/4 ">
        <Navbar />
      </div>
      <div className="flex-1 border-x">
        <Outlet />
      </div>
      <div className="w-1/4 p-4">
        <SideBar />
      </div>
    </div>
  );
};

export default Layout;
