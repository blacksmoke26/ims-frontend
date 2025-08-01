// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

export type UserRole = 'admin' | 'user';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  auth: {
    token: string;
    issuedAt: string;
    expires: string;
  };
  user: {
    fullname: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
  };
}
