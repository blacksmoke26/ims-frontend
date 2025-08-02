// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {useFormik} from 'formik';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router';
import {Button, Form} from 'react-bootstrap';

// clients
import ApiClient from '~/clients/ApiClient';

// redux
import {setLogout} from '~store/slices/auth/reducers.ts';
import {useAppDispatch} from '~store/hooks.ts';

// layout
import SpiltSidebarContent from '~components/layout/SpiltSidebarContent';

// ui
import InputControl from '~components/form/InputControl';

// utils
import {auth, identity} from '~/endpoints';
import {validationSchema} from './validation-schema';

// types
import type {ChangePasswordPayload} from '~types/api.types';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<ChangePasswordPayload>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema,
    async onSubmit(values) {
      try {
        await ApiClient.getInstance()
          .post<unknown, ChangePasswordPayload>('/user/change-password', values);
        toast.success('Password updated, Please login.');
        dispatch(setLogout());
        setTimeout(() => navigate(auth.login), 150);
      } catch (e) {
        formik.setErrors({currentPassword: ApiClient.errorMessageFromResponse(e)});
      }
    },
  });

  return (
    <SpiltSidebarContent caption="Change password">
      <Form onSubmit={formik.handleSubmit}>
        <p className="d-block text-muted mb-3">Strengthen your account by ensuring your password is strong.</p>
        <InputControl<ChangePasswordPayload>
          formik={formik} name="currentPassword" label="Old password" controlProps={{
          autoComplete: 'off', className: "w-40",
        }}/>
        <InputControl<ChangePasswordPayload>
          formik={formik} name="newPassword" label="New password" controlProps={{
           autoComplete: 'off', className: "w-40",
        }}/>
        <p className="text-muted fw-lighter">
          Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
        </p>
        <Form.Group className="mb-3">
          <Button type="submit" disabled={formik.isSubmitting} variant="success" className="px-4">
            Update</Button>
          <Button type="button" variant="link" onClick={() => {
            navigate(identity.forgotPassword)
          }}>
            I forgot my password</Button>
        </Form.Group>
      </Form>
    </SpiltSidebarContent>
  );
};

export default ChangePasswordPage;
