// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {NavLink} from 'react-router';

// redux
import {useAppSelector} from '~store/hooks';

// components
import NonAuthenticatedElements from './NonAuthenticatedElements.tsx';
import AuthenticatedElements from './AuthenticatedElements.tsx';

// utils
import {main} from '~/endpoints.ts';

const NavigationBar = () => {
  const isAuthenticated = useAppSelector(state => state.auth.authenticated);

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
            {isAuthenticated ? <AuthenticatedElements/> : <NonAuthenticatedElements/>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
