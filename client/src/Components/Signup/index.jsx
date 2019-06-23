import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import { Form, Button, Container } from 'react-bootstrap';
import signupValidation from './validation';
import auth from '../../auth/auth';

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
    const { setUserInfo } = this.props;
    const { username, password: pass, email, confPassword } = this.state;
    this.setState({ errormsg: '' });
    signupValidation
      .validate(
        {
          email,
          pass,
          confPassword,
          username,
        },
        { abortEarly: false }
      )
      .then(() => {
        fetch('/api/v1/members', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, pass }),
        })
          .then(res => res.json())
          .then(response => {
            if (response.data) {
              const { history } = this.props;
              localStorage.setItem(
                'userInfo',
                JSON.stringify(response.data[0])
              );
              auth.isAuthenticated = true;
              setUserInfo(response.data);
              history.push('/home');
            } else {
              this.setState({ errormsg: response.error.msg });
            }
          })
          .catch(err => (auth.error = err));
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
    this.setState(({ errormsg }) => {
      const newErrormsg = { ...errormsg };
      newErrormsg[name] = '';
      return { [name]: value, errormsg: newErrormsg };
    });
  };

  render() {
    const { username, email, password, confPassword, errormsg } = this.state;
    const { location } = this.props;
    if (auth.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: location },
          }}
        />
      );
    }
    return (
      <Container>
        <Form className="content-signup">
          <h2 className="content-signup__word-sigup">SIGN UP</h2>
          <Form.Group controlId="formBasicUsername">
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

          <Form.Group controlId="formBasicEmail">
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

          <Form.Group controlId="formBasicPassword">
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
          <Form.Group controlId="formBasicPassword">
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
          <p className="errormsg">{errormsg.msg}</p>
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
              login
            </Link>
          </Form.Text>
        </Form>
      </Container>
    );
  }
}
