// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, 'Password is too short')
    .max(20, 'Password is too long')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(8, 'Password is too short')
    .max(20, 'Password is too long')
    .required('Password is required'),
});
