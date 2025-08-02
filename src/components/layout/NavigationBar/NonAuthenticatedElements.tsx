// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {NavLink} from 'react-router';

// utils
import {auth, identity} from '~/endpoints.ts';

// icons
import {UserCircleIcon} from '@phosphor-icons/react/UserCircle';
import {UserCirclePlusIcon} from '@phosphor-icons/react/UserCirclePlus';

const NonAuthenticatedElements = () => {
  return (
    <>
      <li className="nav-item">
        <NavLink to={identity.register} className="navbar-nav-link navbar-nav-link-icon rounded ms-1">
          <div className="d-flex align-items-center mx-md-1">
            <UserCirclePlusIcon size="18" style={{marginTop: 1}}/>
            <span className="d-none d-md-inline-block ms-2">Register</span>
          </div>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={auth.login} className="navbar-nav-link navbar-nav-link-icon rounded ms-1">
          <div className="d-flex align-items-center mx-md-1">
            <UserCircleIcon size="18" style={{marginTop: 1}}/>
            <span className="d-none d-md-inline-block ms-2">Login</span>
          </div>
        </NavLink>
      </li>
    </>
  );
}

export default NonAuthenticatedElements;
