// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import {Form} from 'react-bootstrap';
import objectPath from 'object-path';

// types
import type {FormikProps} from 'formik';
import type {FormControlProps, FormGroupProps, FormLabelProps} from 'react-bootstrap';

export interface InputControlProps<T> {
  formik: FormikProps<T>;
  name: string;
  label: string;
  groupProps?: FormGroupProps;
  controlProps?: FormControlProps;
  labelProps?: FormLabelProps;
}

function InputControl<T>({formik, ...props}: InputControlProps<T>) {
  return (
    <Form.Group className="mb-3" {...(props.groupProps || {})}>
      <Form.Label {...(props.labelProps || {})}>{props.label}</Form.Label>
      <Form.Control
        name={props.name}
        type="text"
        isValid={objectPath.get(formik.touched, props.name) && !objectPath.get(formik.errors, props.name)}
        isInvalid={!!objectPath.get(formik.errors, props.name)}
        onChange={formik.handleChange} value={objectPath.get(formik.values as Record<string, string>, props.name)}
        {...(props.controlProps || {})}
      />
      <Form.Control.Feedback type="invalid">
        {objectPath.get(formik.errors, props.name)}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default InputControl;
