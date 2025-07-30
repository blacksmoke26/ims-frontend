// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {UserCircleIcon} from '@phosphor-icons/react/UserCircle';
import {LockIcon} from '@phosphor-icons/react/Lock';

const Login = () => {
  return (
    <>
      <form className="login-form" action="index.html">
        <div className="card mb-0">
          <div className="card-body">
            <div className="text-center mb-3">
              <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                <img src="https://themes.kopyov.com/limitless/demo/template/assets/images/logo_icon.svg"
                     className="h-48px" alt=""/>
              </div>
              <h5 className="mb-0">Login to your account</h5>
              <span className="d-block text-muted">Enter your credentials below</span>
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
              <div className="form-control-feedback form-control-feedback-start">
                <input type="text" className="form-control" placeholder="john@doe.com"/>
                <div className="form-control-feedback-icon">
                  <UserCircleIcon className="text-muted" size="18" style={{marginTop: 1}}/>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="form-control-feedback form-control-feedback-start">
                <input type="password" className="form-control" placeholder="•••••••••••"/>
                <div className="form-control-feedback-icon">
                  <LockIcon className="text-muted" size="18" style={{marginTop: 1}}/>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary w-100">Sign in</button>
            </div>

            <div className="text-center">
              <a href="login_password_recover.html">Forgot password?</a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
