// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {NavLink} from 'react-router';

// utils
import {main, account} from '~/endpoints.ts';

// icons
import {HouseIcon} from '@phosphor-icons/react/House';
import {LockIcon} from '@phosphor-icons/react/Lock';

const Sidebar = () => {
  return (
    <ul className="nav nav-sidebar" data-nav-type="accordion">
      <li className="nav-item-header">
        <div className="text-uppercase fs-sm lh-sm opacity-50 sidebar-resize-hide">Main</div>
        <i className="ph-dots-three sidebar-resize-show"></i>
      </li>
      <li className="nav-item">
        <NavLink to={main.index} className="nav-link">
          <HouseIcon className="me-2 mt-1"/>
          <span>Dashboard</span>
        </NavLink>
      </li>

      <li className="nav-item-header ">
        <div className="text-uppercase fs-sm lh-sm opacity-50 sidebar-resize-hide">Security</div>
        <i className="ph-dots-three sidebar-resize-show"></i>
      </li>
      <li className="nav-item">
        <NavLink to={account.security.changePassword} className="nav-link">
          <LockIcon className="me-2 mt-1"/>
          <span>Change Password</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default Sidebar;
