// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {useFormik} from 'formik';
import {NavLink, useNavigate} from 'react-router';
import {Button, Form, Card} from 'react-bootstrap';

// clients
import ApiClient from '~/clients/ApiClient';

// layout
import PageContent from '~components/layout/PageContent';
import NavigationBar from '~components/layout/NavigationBar';

// utils
import {identity, main} from '~/endpoints';
import {validationSchema} from './validation-schema';

// redux
import {useAppDispatch} from '~store/hooks';
import {setLogin} from '~store/slices/auth/reducers';

// types
import type {LoginPayload, LoginResponse} from '~types/api.types';

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const formik = useFormik<LoginPayload>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const response = await ApiClient.getInstance()
          .post<LoginResponse, LoginPayload>('/auth/login', values);

        dispatch((setLogin(response)));
        navigate(main.index);
      } catch (e) {
        formik.setErrors({password: ApiClient.errorMessageFromResponse(e)});
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
                <div className="d-inline-flex align-items-center justify-content-center mb-4 mt-2">
                  <img src="https://themes.kopyov.com/limitless/demo/template/assets/images/logo_icon.svg"
                       className="h-48px" alt=""/>
                </div>
                <h5 className="mb-0">Login to your account</h5>
                <span className="d-block text-muted">Enter your credentials below</span>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="text" placeholder="name@example.com"
                  isValid={formik.touched.email && !formik.errors.email}
                  isInvalid={!!formik.errors.email}
                  onChange={formik.handleChange} value={formik.values.email}/>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password" placeholder="•••••••••••"
                  isValid={formik.touched.password && !formik.errors.password}
                  isInvalid={!!formik.errors.password}
                  onChange={formik.handleChange} value={formik.values.password}/>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Button type="submit" variant="primary" className="w-100">Sign in</Button>
              </Form.Group>

              <div className="text-center">
                <NavLink to={identity.forgotPassword}>Forgot password?</NavLink>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </PageContent>
    </>
  );
};

export default LoginPage;
