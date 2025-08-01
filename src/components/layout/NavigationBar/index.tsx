// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {NavLink, useNavigate} from 'react-router';

// redux
import {useAppSelector, useAppDispatch} from '~store/hooks';
import {setLogout} from '~store/slices/auth/reducers';

// clients
import ApiClient from '~/clients/ApiClient';

// utils
import {auth, identity, main} from '~/endpoints.ts';

// icons
import {UserCircleIcon} from '@phosphor-icons/react/UserCircle';
import {UserCirclePlusIcon} from '@phosphor-icons/react/UserCirclePlus';

const NavigationBar = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const onLogoutHandler = async () => {
    try {
      await ApiClient.getInstance().post('/auth/logout');
    } finally {
      dispatch(setLogout());
      setTimeout(() => navigate(auth.login), 150);
    }
  };

  return (
    <div className="navbar navbar-dark navbar-static py-2">
      <div className="container-fluid">
        <div className="navbar-brand">
          <NavLink to={main.index} className="d-inline-flex align-items-center">
            <img src="https://themes.kopyov.com/limitless/demo/template/assets/images/logo_icon.svg" alt=""/>
            <img src="https://themes.kopyov.com/limitless/demo/template/assets/images/logo_text_light.svg"
                 className="d-none d-sm-inline-block h-16px ms-3" alt=""/>
          </NavLink>
        </div>

        <div className="d-flex justify-content-end align-items-center ms-auto">
          <ul className="navbar-nav flex-row">
            {!authState.authenticated && (
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
            )}
            {authState.authenticated && (
              <>
                <li className="nav-item">
                  <a href="/" onClick={e => {
                    e.preventDefault();
                    onLogoutHandler();
                  }} className="navbar-nav-link navbar-nav-link-icon rounded ms-1">
                    <div className="d-flex align-items-center mx-md-1">
                      <UserCircleIcon size="18" style={{marginTop: 1}}/>
                      <span className="d-none d-md-inline-block ms-2">Logout</span>
                    </div>
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
