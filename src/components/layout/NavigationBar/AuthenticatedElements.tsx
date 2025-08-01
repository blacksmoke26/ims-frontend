// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {Dropdown} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router';

// clients
import ApiClient from '~/clients/ApiClient.ts';

// redux
import {useAppDispatch, useAppSelector} from '~store/hooks.ts';
import {setLogout} from '~store/slices/auth/reducers.ts';

// utils
import {auth} from '~/endpoints.ts';

// icons
import {UserCircleIcon} from '@phosphor-icons/react/UserCircle';
import {GearIcon} from '@phosphor-icons/react/Gear';
import {SignOutIcon} from '@phosphor-icons/react/SignOut';

const AuthenticatedElements = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const userState = useAppSelector(state => state.auth.user);

  const onLogoutHandler = async () => {
    try {
      await ApiClient.getInstance().post('/auth/logout');
    } finally {
      dispatch(setLogout());
      setTimeout(() => navigate(auth.login), 150);
    }
  };

  return (
    <>
      <li className="nav-item">
        <Dropdown drop="up" align="end">
          <Dropdown.Toggle as="a" className="navbar-nav-link align-items-center rounded-pill p-1 cursor-pointer">
            <div className="status-indicator-container">
              <img src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
                   className="w-32px h-32px rounded-pill" alt=""/>
              <span className="status-indicator bg-success"></span>
            </div>
            <span className="d-none d-lg-inline-block mx-lg-2">{userState?.firstName}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-end">
            <NavLink aria-current="time" to="/user/profile" className="dropdown-item">
              <UserCircleIcon className="me-2"/> My profile
            </NavLink>
            <NavLink to="/user/settings" className="dropdown-item">
              <GearIcon className="me-2"/> Account settings
            </NavLink>
            <Dropdown.Item href="/" onClick={e => {
              e.preventDefault();
              onLogoutHandler();
            }}><SignOutIcon className="me-2"/> Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    </>
  );
};

export default AuthenticatedElements;
