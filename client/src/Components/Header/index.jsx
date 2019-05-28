import React from 'react';
import { Navbar, Nav, Col } from 'react-bootstrap';
import './style.css';

export default function Header(props) {
  const { islooged } = props;
  const route = window.location.href.split('/')[3];
  return (
    <div className="Navbar--container">
      <Navbar collapseOnSelect expand="lg" variant="dark">
        <Col className="ml-3 mr-5">
          <Navbar.Brand href="#home" xs="auto" lg="2">
            Work Together
          </Navbar.Brand>

          <img
            src=""
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Col>

        {!islooged && (
          <div className="ml-auto">
            <Nav className="ml-3">
              <Nav.Link
                href="/login"
                className={`ml-3 nav--link ${route === 'login' &&
                  'route--active'}`}
              >
                Login
              </Nav.Link>
              <Nav.Link
                href="/signup"
                className={`ml-3 mr-5 nav--link ${route === 'signup' &&
                  'route--active'}`}
              >
                Signup
              </Nav.Link>
            </Nav>
          </div>
        )}
      </Navbar>
    </div>
  );
}
