// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {Navigate} from 'react-router';

// redux
import {useAppSelector} from '~store/hooks';

export type PublicRouteProps = {
  redirectPath?: string;
  children: React.ReactNode;
};

const PublicRoute = (props: PublicRouteProps) => {
  const authState = useAppSelector(state => state.auth);

  if (authState.authenticated) {
    return <Navigate to={props?.redirectPath ?? '/'} replace/>;
  }

  return props.children;
};

export default PublicRoute;
