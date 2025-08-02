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
import {ArrowsCounterClockwiseIcon} from '@phosphor-icons/react/ArrowsCounterClockwise';
import {ArrowCounterClockwiseIcon} from '@phosphor-icons/react/ArrowCounterClockwise';

// utils
import {auth, identity} from '~/endpoints';
import {validationSchema} from './validation-schema';

// types
import type {RequestPasswordResetPayload} from '~types/api.types';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const formik = useFormik<RequestPasswordResetPayload>({
    initialValues: {
      email: '',
    },
    validationSchema,
    async onSubmit(values) {
      try {
        await ApiClient.getInstance()
          .post<unknown, RequestPasswordResetPayload>('/identity/password-reset-request', values);
        toast.success('Successfully sent request, check your email!');
        navigate(identity.resetPassword);
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
                  <ArrowsCounterClockwiseIcon className="ph-2x text-5xl"/>
                </div>
                <h5 className="mb-0">Password recovery</h5>
                <span className="d-block text-muted">We'll send you instructions in email</span>
              </div>

              <InputControl<RequestPasswordResetPayload>
                formik={formik} name="email" label="Your email" controlProps={{
                placeholder: 'john@doe.com', autoComplete: 'off',
              }}/>

              <Form.Group className="mb-3">
                <Button type="submit" disabled={formik.isSubmitting} variant="primary" className="w-100">
                  <ArrowCounterClockwiseIcon className="me-1"/>
                  Reset password</Button>
              </Form.Group>

              <div className="text-center">
                Looking for <NavLink to={auth.login}>Sign in?</NavLink>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </PageContent>
    </>
  );
};

export default ForgotPasswordPage;
