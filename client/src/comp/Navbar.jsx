import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  IoHomeOutline,
  IoHome,
  IoPerson,
  IoPersonOutline,
} from 'react-icons/io5';
const Navbar = () => {
  const currPath = useLocation().pathname;
  const activeClassName =
    'text-xl bg-slate-100 p-4 group rounded flex items-center space-x-2 font-semibold';
  const className =
    'text-xl hover:bg-slate-100 p-4 rounded flex items-center space-x-2';

  return (
    <div className="flex flex-col p-4 justify-between h-full">
      <div className="flex flex-col mt-4 space-y-4">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          My Stories
        </h1>
        <div className="flex flex-col space-y-2">
          <NavLink
            to={'.'}
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
            end
          >
            {currPath === '/' ? <IoHome /> : <IoHomeOutline />}
            <p>Home</p>
          </NavLink>
          <NavLink
            to={'profile'}
            className={({ isActive }) =>
              isActive ? activeClassName : className
            }
          >
            {currPath === '/profile' ? <IoPerson /> : <IoPersonOutline />}
            <p>Profile</p>
          </NavLink>
        </div>
      </div>
      <div className="">Sign in</div>
    </div>
  );
};

export default Navbar;
