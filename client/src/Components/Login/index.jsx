import React from 'react';
import './style.css';
import { Form, Button } from 'react-bootstrap';
import UnderConstruction from '../UnderConstruction';

export default function Login() {
  return (
    <>
      <section className="content-page">
        <Form className="content-page__content-login">
          <span className="content-page__content-login__word-login">Login</span>
          <Form.Group
            controlId="formBasicUsername"
            className="content-page__content-login__username"
          >
            <Form.Label>Username : </Form.Label>
            <Form.Control type="username" placeholder="e.g: emily1234" />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="content-page__content-login__password"
          >
            <Form.Label>Password :</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="content-page__content-login__submit"
          >
            Login
          </Button>
          <Form.Text className="content-page__content-login__text-muted">
            Don’t have an account?{' '}
            <span className="content-page__content-login__word-signup">
              Sign Up
            </span>
          </Form.Text>
        </Form>
      </section>
      <UnderConstruction />
    </>
  );
}
