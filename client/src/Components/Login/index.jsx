import React from 'react';
import './style.css';
import { Form, Button, Container } from 'react-bootstrap';

import { Link, Redirect } from 'react-router-dom';
import auth from '../../auth/auth';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    message: '',
  };

  handleClick = () => {
    const { username, password } = this.state;
    const { setUserInfo } = this.props;
    if (username && password) {
      // make a requset to the back with method post and data{username , password}
      fetch('/api/v1/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          pass: password,
        }),
      })
        .then(response => {
          if (response.status !== 200) {
            this.setState({ message: 'Check username or password ... !!' });
          }
          return response.json();
        })
        .then(({ data }) => {
          if (data) {
            auth.setUserInfo(data);
            auth.isAuthenticated = true;
            setUserInfo(data);
            const {
              // eslint-disable-next-line react/prop-types
              history: {
                push,
                location: { state },
              },
            } = this.props;
            const prevPath = state.from.state.from.pathname;
            if (prevPath) {
              return push(prevPath);
            }
            return push('/home');
          }
        })
        .catch(err => {
          auth.error = err;
        });
    } else {
      this.setState({ message: 'Please enter all fields' });
    }
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value, message: '' });

  render() {
    const { location } = this.props;
    const { username, password, message } = this.state;
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
        <Form className="login__form">
          <h2 className="login__form-title">LOGIN</h2>
          <Form.Group>
            <Form.Label>Username :</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <p className="message">{message}</p>
          <Button
            type="button"
            className="login__form-btn"
            onClick={this.handleClick}
          >
            Login
          </Button>
          <Form.Text className="login__form__text-muted">
            Don’t have an account?{' '}
            <Link className="link-signup-word" to="/signup">
              sign up
            </Link>
          </Form.Text>
        </Form>
      </Container>
    );
  }
}
