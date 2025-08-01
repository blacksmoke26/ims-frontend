// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {BrowserRouter, Route, Routes} from 'react-router';

// pages
import HomePage from '~pages/main/home';
import LoginPage from '~pages/auth/login';
import RegisterPage from '~pages/identity/register';
import ForgotPasswordPage from '~pages/identity/forgot-password';

// utils
import {auth, identity} from '~/endpoints.ts';
import ProtectedRoute from '~components/generic/ProtectedRoute';
import PublicRoute from '~components/generic/PublicRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path={auth.login} element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path={identity.register} element={<PublicRoute><RegisterPage/></PublicRoute>}/>
        <Route path={identity.forgotPassword} element={<PublicRoute><ForgotPasswordPage/></PublicRoute>}/>
        <Route path="/user/account" element={<ProtectedRoute><p>Protected</p></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
