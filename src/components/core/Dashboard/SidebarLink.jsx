import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {

    const Icon = Icons[iconName];
    const dispatch = useDispatch();
    const location = useLocation();

    const matchRoute = (route) => { 

        return matchPath({ path: route }, location.pathname);
    }

    
  return (
        // TODO : onClick
      <NavLink to={link.path}
          className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-700" : "bg-opacity-0"}`}
      >
          <span className={`absolute bg-yellow-50 w-[0.2rem] h-full top-0 left-0 
           ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
          </span>
          <div className="flex items-center gap-x-2">
              <Icon className="text-lg" />
              <span>{ link.name }</span>
          </div>
      </NavLink>
  )
}

export default SidebarLink