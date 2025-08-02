// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {useFormik} from 'formik';
import {toast} from 'react-toastify';
import {NavLink, useNavigate} from 'react-router';
import {Button, Form, Card} from 'react-bootstrap';

// clients
import ApiClient from '~/clients/ApiClient';

// layout
import PageContent from '~components/layout/PageContent';
import NavigationBar from '~components/layout/NavigationBar';

// ui
import InputControl from '~components/form/InputControl';

// icons
import {LockIcon} from '@phosphor-icons/react/Lock';
import {CheckIcon} from '@phosphor-icons/react/Check';

// utils
import {auth, identity} from '~/endpoints';
import {validationSchema} from './validation-schema';

// types
import type {ResetPasswordPayload} from '~types/api.types';

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const formik = useFormik<ResetPasswordPayload>({
    initialValues: {
      resetCode: '',
      email: '',
      newPassword: '',
    },
    validationSchema,
    async onSubmit(values) {
      try {
        await ApiClient.getInstance()
          .post<unknown, ResetPasswordPayload>('/identity/password-reset', values);
        toast.success('Password updated, Please login.');
        navigate(auth.login);
      } catch (e) {
        formik.setErrors({email: ApiClient.errorMessageFromResponse(e)});
      }
    },
  });

  return (
    <>
      <NavigationBar/>
      <PageContent centerAll={true}>
        <Form className="login-form" onSubmit={formik.handleSubmit}>
          <Card className="mb-0">
            <Card.Body>
              <div className="text-center mb-3">
                <div className="d-inline-flex bg-primary bg-opacity-10 text-primary lh-1 rounded-pill p-3 mb-3 mt-1">
                  <LockIcon className="ph-2x text-5xl"/>
                </div>
                <h5 className="mb-0">Reset password</h5>
                <span className="d-block text-muted">All fields are required</span>
              </div>

              <InputControl<ResetPasswordPayload>
                formik={formik} name="resetCode" label="Reset code" controlProps={{
                placeholder: 'XAE4576', autoComplete: 'off',
              }}/>

              <InputControl<ResetPasswordPayload>
                formik={formik} name="email" label="Email address" controlProps={{
                placeholder: 'john@doe.com', autoComplete: 'off',
              }}/>

              <InputControl<ResetPasswordPayload>
                formik={formik} name="newPassword" label="Password" controlProps={{
                type: 'password',
                placeholder: '•••••••••••', autoComplete: 'off',
              }}/>

              <Form.Group className="mb-3">
                <Button type="submit" disabled={formik.isSubmitting} variant="primary" className="w-100">
                  <CheckIcon className="me-1"/>
                  Update password</Button>
              </Form.Group>

              <div className="text-center">
                No code received yet? <NavLink to={identity.forgotPassword}>Send again</NavLink>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </PageContent>
    </>
  );
};

export default ResetPasswordPage;
