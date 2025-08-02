// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'First name is too short')
    .max(20, 'First name is too long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'Last name is too short')
    .max(20, 'Last name is too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address given')
    .required('Email address is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .max(20, 'Password is too long')
    .required('Password is required'),
});
