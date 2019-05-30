import React from 'react';
import './style.css';
import { Form, Button } from 'react-bootstrap';

export default function SignUp() {
  return (
    <>
      <Form className="content-signup">
        <span className="content-signup__word-sigup">Sign Up</span>
        <Form.Group
          controlId="formBasicUsername"
          className="content-signup__input"
        >
          <Form.Label>
            Username : <span className="content-signup__star">*</span>
          </Form.Label>
          <Form.Control type="username" placeholder="e.g: emily1234" />
        </Form.Group>

        <Form.Group
          controlId="formBasicEmail"
          className="content-signup__input"
        >
          <Form.Label>
            E-mail : <span className="content-signup__star">*</span>
          </Form.Label>
          <Form.Control type="email" placeholder="e.g: someone@hotmail.com" />
        </Form.Group>

        <Form.Group
          controlId="formBasicPassword"
          className="content-signup__input"
        >
          <Form.Label>
            Password : <span className="content-signup__star">*</span>
          </Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group
          controlId="formBasicPassword"
          className="content-signup__input"
        >
          <Form.Label>
            Confirm Password : <span className="content-signup__star">*</span>
          </Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="content-signup__submit"
        >
          Submit
        </Button>
        <Form.Text className="content-signup__text-muted">
          Already have an account?{' '}
          <span className="content-signup__word-login">Login</span>
        </Form.Text>
      </Form>
    </>
  );
}
