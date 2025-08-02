// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {useState} from 'react';
import {useFormik} from 'formik';
import {NavLink} from 'react-router';
import {Alert, Button, Card, Form} from 'react-bootstrap';

// clients
import ApiClient from '~/clients/ApiClient';

// layout
import PageContent from '~components/layout/PageContent';
import NavigationBar from '~components/layout/NavigationBar';

// ui
import InputControl from '~components/form/InputControl';

// utils
import {auth} from '~/endpoints';
import {validationSchema} from './validation-schema';

// types
import type {RegisterPayload} from '~types/api.types';

const RegisterPage = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const formik = useFormik<RegisterPayload>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values) {
      try {
        await ApiClient.getInstance()
          .post<unknown, RegisterPayload>('/identity/signup', values);

        setIsSubmitted(true);
      } catch (e) {
        formik.setErrors({email: ApiClient.errorMessageFromResponse(e)});
      }
    },
  });

  return (
    <>
      <NavigationBar/>
      <PageContent centerAll={true}>
        {!isSubmitted && (
          <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Card className="mb-0">
              <Card.Body>
                <div className="text-center mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                    <img src="https://themes.kopyov.com/limitless/demo/template/assets/images/logo_icon.svg"
                         className="h-48px" alt=""/>
                  </div>
                  <h5 className="mb-0">Create account</h5>
                  <span className="d-block text-muted">All fields are required</span>
                </div>

                <div className="text-center text-muted content-divider mb-3">
                  <span className="px-2">Your credentials</span>
                </div>
                <InputControl<RegisterPayload>
                  formik={formik} name="firstName" label="First name" controlProps={{
                  placeholder: 'John', autoComplete: 'off',
                }}/>

                <InputControl<RegisterPayload>
                  formik={formik} name="lastName" label="Last name" controlProps={{
                  placeholder: 'Doe', autoComplete: 'off',
                }}/>

                <InputControl<RegisterPayload>
                  formik={formik} name="email" label="Email address" controlProps={{
                  placeholder: 'name@example.com', autoComplete: 'off',
                }}/>

                <InputControl<RegisterPayload>
                  formik={formik} name="password" label="Password" controlProps={{
                  type: 'password',
                  placeholder: '•••••••••••', autoComplete: 'off',
                }}/>

                <Form.Group className="mb-3">
                  <Button type="submit" variant="primary" className="w-100">Register</Button>
                </Form.Group>

                <div className="text-center">
                  Looking for <NavLink to={auth.login}>Sign in?</NavLink>
                </div>
              </Card.Body>
            </Card>
          </Form>
        )}

        {isSubmitted && (
          <div>
            <Alert variant="success" className="px-4 py-4">
              <Alert.Heading>Success!</Alert.Heading>
              <p>
                You have successfully registered. Please check your email for the verification link.
              </p>
              <div className="mt-3">
                To sign in again, please <NavLink to={auth.login}>click here</NavLink>.
              </div>
            </Alert>
          </div>
        )}
      </PageContent>
    </>
  );
};

export default RegisterPage;
