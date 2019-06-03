import React, { Component } from 'react';
import './style.css';
import { Form, Button } from 'react-bootstrap';
import signupValidation from '../Helpers/validation';

export default class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confPassword: '',
    errmsgUsername: '',
    errmsgEmail: '',
    errmsgPassword: '',
    errmsgconfPassword: '',
  };

  handleClick = e => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      confPassword,
      errmsgUsername,
      errmsgEmail,
      errmsgPassword,
      errmsgconfPassword,
    } = this.state;
    signupValidation
      .validate(
        { username, email, password, confPassword },
        { abortEarly: false }
      )
      .then(() => {
        // this.setState({ errmsg: '' });
      })
      .catch(({ inner }) => {
        // console.log(inner);

        if (inner) {
          inner.map(item => {
            console.log(item, 'hhhh');

            console.log(item.message);
            if (
              item.message === 'username must be at least 3 characters' &&
              item.message === 'username is a required field'
            )
              this.setState({ errmsgUsername: item.message });
            else if (
              item.message === 'email must be at least 3 characters' &&
              item.message === 'email is a required field'
            )
              this.setState({ errmsgEmail: item.message });
            else if (
              item.message === 'password must be at least 3 characters' &&
              item.message === 'password is a required field'
            )
              this.setState({ errmsgPassword: item.message });
            else if (
              item.message === 'confPassword must be at least 3 characters' &&
              item.message === 'confPassword is a required field'
            )
              this.setState({ errmsgconfPassword: item.message });
          });
        }
      });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      username,
      email,
      password,
      confPassword,
      errmsgUsername,
      errmsgEmail,
      errmsgPassword,
      errmsgconfPassword,
    } = this.state;
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
            <Form.Control
              name="username"
              value={username}
              onChange={this.handleChange}
              type="username"
              placeholder="e.g: emily1234"
            />
          </Form.Group>
          <span>{errmsgUsername}</span>
          <Form.Group
            controlId="formBasicEmail"
            className="content-signup__input"
          >
            <Form.Label>
              E-mail : <span className="content-signup__star">*</span>
            </Form.Label>
            <Form.Control
              name="email"
              value={email}
              onChange={this.handleChange}
              type="email"
              placeholder="example@mail.com"
            />
          </Form.Group>
          <span>{errmsgEmail}</span>
          <Form.Group
            controlId="formBasicPassword"
            className="content-signup__input"
          >
            <Form.Label>
              Password : <span className="content-signup__star">*</span>
            </Form.Label>
            <Form.Control
              name="password"
              value={password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <span>{errmsgPassword}</span>
          <Form.Group
            controlId="formBasicPassword"
            className="content-signup__input"
          >
            <Form.Label>
              Confirm Password : <span className="content-signup__star">*</span>
            </Form.Label>
            <Form.Control
              name="confPassword"
              value={confPassword}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <span>{errmsgconfPassword}</span>
          <Button
            variant="primary"
            type="submit"
            className="content-signup__submit"
            onClick={this.handleClick}
          >
            Submit
          </Button>
          <span>{errmsgPassword}</span>
          <Form.Text className="content-signup__text-muted">
            Already have an account?{' '}
            <span className="content-signup__word-login">Login</span>
          </Form.Text>
        </Form>
      </>
    );
  }
}
