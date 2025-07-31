// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {useFormik} from 'formik';
import {NavLink} from 'react-router';
import {Button, Form} from 'react-bootstrap';

// layout
import PageContent from '~components/layout/PageContent';
import NavigationBar from '~components/layout/NavigationBar';

// utils
import {identity} from '~/endpoints.ts';
import {validationSchema} from './validation-schema.tsx';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <NavigationBar/>
      <PageContent centerAll={true}>
        <Form className="login-form" onSubmit={formik.handleSubmit}>
          <div className="card mb-0">
            <div className="card-body">
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
            </div>
          </div>
        </Form>
      </PageContent>
    </>
  );
};

export default LoginPage;
