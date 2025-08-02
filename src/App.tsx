// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {ToastContainer} from 'react-toastify';
import {BrowserRouter, Route, Routes} from 'react-router';

// pages
import HomePage from '~pages/main/home';
import LoginPage from '~pages/auth/login';
import RegisterPage from '~pages/identity/register';
import ForgotPasswordPage from '~pages/identity/forgot-password';
import ResetPasswordPage from '~pages/identity/reset-password';

// components
import ProtectedRoute from '~components/generic/ProtectedRoute';
import PublicRoute from '~components/generic/PublicRoute';

// utils
import {auth, identity} from '~/endpoints.ts';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path={auth.login} element={<PublicRoute><LoginPage/></PublicRoute>}/>
          <Route path={identity.register} element={<PublicRoute><RegisterPage/></PublicRoute>}/>
          <Route path={identity.forgotPassword} element={<PublicRoute><ForgotPasswordPage/></PublicRoute>}/>
          <Route path={identity.resetPassword} element={<PublicRoute><ResetPasswordPage/></PublicRoute>}/>
          <Route path="/user/account" element={<ProtectedRoute><p>Protected</p></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
