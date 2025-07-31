// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

export const main = {
  index: '/',
} as const;

export const auth = {
  login: '/auth/login',
  logout: '/auth/logout',
} as const;

export const identity = {
  register: '/identity/register',
  forgotPassword: '/identity/forgot-password',
  resetPassword: '/identity/reset-password',
} as const;
