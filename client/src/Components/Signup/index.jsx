import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { Form, Button } from 'react-bootstrap';
import signupValidation from './validation';

export default class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confPassword: '',
    errormsg: '',
  };

  handleClick = e => {
    e.preventDefault();

    const { username, password, email, confPassword } = this.state;

    signupValidation
      .validate(
        {
          email,
          password,
          confPassword,
          username,
        },
        { abortEarly: false }
      )
      .then(() => {
        // fetch to back end
      })
      .catch(({ inner }) => {
        if (inner) {
          const errors = inner.reduce(
            (acc, item) => ({ ...acc, [item.path]: item.message }),
            {}
          );
          this.setState({ errormsg: { ...errors } });
        }
      });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password, confPassword, errormsg } = this.state;
    return (
      <>
        <Form className="content-signup">
          <h2 className="content-signup__word-sigup">Sign Up</h2>
          <Form.Group
            controlId="formBasicUsername"
            className="content-signup__username"
          >
            <Form.Label>
              Username :{' '}
              <span className="content-signup__username-star">*</span>
            </Form.Label>
            <Form.Control
              name="username"
              value={username}
              onChange={this.handleChange}
              type="username"
              placeholder="e.g: emily1234"
            />
            {errormsg && <span className="errormsg">{errormsg.username}</span>}
          </Form.Group>

          <Form.Group
            controlId="formBasicEmail"
            className="content-signup__email"
          >
            <Form.Label>
              E-mail : <span className="content-signup__email-star">*</span>
            </Form.Label>
            <Form.Control
              name="email"
              value={email}
              onChange={this.handleChange}
              type="email"
              placeholder="example@mail.com"
            />
            {errormsg && <span className="errormsg">{errormsg.email}</span>}
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="content-signup__password"
          >
            <Form.Label>
              Password :{' '}
              <span className="content-signup__password-star">*</span>
            </Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
            {errormsg && <span className="errormsg">{errormsg.password}</span>}
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            className="content-signup__confirm-password"
          >
            <Form.Label>
              Confirm Password :{' '}
              <span className="content-signup__confirm-password-star">*</span>
            </Form.Label>
            <Form.Control
              name="confPassword"
              value={confPassword}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
            {errormsg && (
              <span className="errormsg">{errormsg.confPassword}</span>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="content-signup__submit"
            onClick={this.handleClick}
          >
            Submit
          </Button>
          <Form.Text className="content-signup__text-muted">
            Already have an account?{' '}
            <Link to="/login" className="content-signup__word-login">
              Login
            </Link>
          </Form.Text>
        </Form>
      </>
    );
  }
}
