import React from 'react';
import './style.css';
import { Form, Button, Container } from 'react-bootstrap';

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleClick = () => {
    // make a requset to the back with method post and data{username , password}
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  render() {
    const { username, password } = this.state;

    return (
      <Container>
        <Form className="content-login">
          <span className="content-login__word-login">Login</span>
          <Form.Group
            controlId="formBasicUsername"
            className="content-login__input "
          >
            <Form.Label>Username : </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              placeholder="e.g: emily1234"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicPassword"
            className="content-login__input "
          >
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="button"
            className="content-login__submit"
            onClick={this.handleClick}
          >
            Login
          </Button>
          <Form.Text className="content-login__text-muted">
            Don’t have an account?{' '}
            <span className="content-login__word-signup">Sign Up</span>
          </Form.Text>
        </Form>
      </Container>
    );
  }
}
