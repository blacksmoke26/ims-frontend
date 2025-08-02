// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {Navigate} from 'react-router';
import {auth} from '~/endpoints.ts';

// redux
import {useAppSelector} from '~store/hooks';

// types
import type {UserRole} from '~types/api.types.ts';

export type ProtectedRouteProps = {
  redirectPath?: string;
  role?: UserRole;
  children: React.ReactNode;
};

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const authState = useAppSelector(state => state.auth);

  if (!authState.authenticated) {
    return <Navigate to={props.redirectPath ?? auth.login} replace/>;
  }

  if (props?.role && authState?.user?.role !== props?.role) {
    return <Navigate to="/" replace/>;
  }

  return props.children;
};

export default ProtectedRoute;
