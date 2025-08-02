// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

export type UserRole = 'admin' | 'user';

export interface LoginPayload {
  /** The email address */
  email: string;
  /** Password with alphanumeric chars along with symbols */
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

export interface RegisterPayload {
  /** The first name of user */
  firstName: string;
  /** The last name of user */
  lastName: string;
  /** The email address */
  email: string;
  /** Password with alphanumeric chars along with symbols */
  password: string;
}
