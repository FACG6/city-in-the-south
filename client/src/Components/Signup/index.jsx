import React from 'react';
import './style.css';
import { Form, Button } from 'react-bootstrap';
import UnderConstruction from '../UnderConstruction';

export default function SignUp() {
  return (
    <>
      <section className="content-page">
        <Form className="content-page__content-signup">
          <span className="content-page__content-signup__word-sigup">
            Sign Up
          </span>
          <Form.Group
            controlId="formBasicUsername"
            className="content-page__content-signup__username"
          >
            <Form.Label>
              Username :{' '}
              <span className="content-page__content-signup__username-star">
                *
              </span>
            </Form.Label>
            <Form.Control type="username" placeholder="e.g: emily1234" />
          </Form.Group>

          <Form.Group
            controlId="formBasicEmail"
            className="content-page__content-signup__email"
          >
            <Form.Label>
              E-mail :{' '}
              <span className="content-page__content-signup__email-star">
                *
              </span>
            </Form.Label>
            <Form.Control type="email" placeholder="e.g: someone@hotmail.com" />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="content-page__content-signup__password"
          >
            <Form.Label>
              Password :{' '}
              <span className="content-page__content-signup__password-star">
                *
              </span>
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="content-page__content-signup__confirm-password"
          >
            <Form.Label>
              Confirm Password :{' '}
              <span className="content-page__content-signup__confirm-password-star">
                *
              </span>
            </Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="content-page__content-signup__submit"
          >
            Submit
          </Button>
          <Form.Text className="content-page__content-signup__text-muted">
            Already have an account?{' '}
            <span className="content-page__content-signup__word-login">
              Login
            </span>
          </Form.Text>
        </Form>
        <UnderConstruction />
      </section>
    </>
  );
}
