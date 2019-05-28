import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col, Dropdown } from 'react-bootstrap';
import './style.css';

class Header extends Component {
  state = {
    route: '/',
    userInfo: {},
  };

  componentDidMount() {
    const userInfo = localStorage.getItem('userInfo');
    this.setState({ userInfo });
  }

  render() {
    const { islooged } = this.props;
    const { userInfo } = this.state;
    let fullName = 'Ayman AlQoqa';
    let username = 'ayman321396';
    let avatar =
      'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg';
    if (userInfo) {
      username = userInfo.username;
      fullName = userInfo.fullName;
      avatar = userInfo.avatar;
    }
    const notification = true;

    return (
      <div className="header__container">
        <Navbar
          collapseOnSelect
          expand="lg"
          variant="dark"
          className="Navbar__container"
        >
          <Col className="ml-3 mr-5" xs>
            <Navbar.Brand lg="2">
              <Link to="/" className="navbar__link navbar__brand">
                Work Together
              </Link>
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
            <Col md="auto">
              <Nav>
                <NavLink to="/login" className="navbar__link">
                  <div className="navbar__link--text">Login</div>
                </NavLink>

                <NavLink to="/Signup" className="navbar__link">
                  <div className="navbar__link--text">Signup</div>
                </NavLink>
              </Nav>
            </Col>
          )}

          {islooged && (
            <>
              <Col md="auto">
                <Nav>
                  <NavLink to="/home" className="navbar__link">
                    <div className="navbar__link--text">Home</div>
                  </NavLink>

                  <NavLink to="/app/my-applications" className="navbar__link">
                    <div className="navbar__link--text">My Applications</div>
                  </NavLink>

                  <NavLink to="/app/my-offers" className="navbar__link">
                    <div className="navbar__link--text">My Offers</div>
                  </NavLink>

                  <NavLink to="/app/saved-offers" className="navbar__link">
                    <div className="navbar__link--text">Saved Offers</div>
                  </NavLink>

                  <NavLink to="/app/new-offer" className="navbar__link">
                    <div className="navbar__link--text">New Offer</div>
                  </NavLink>
                </Nav>
              </Col>
              <Col md="auto">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="nav--dropdown"
                  >
                    <img src={avatar} alt="Avatar" className="nav--avatar" />{' '}
                    {'    '}
                    {fullName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown__menu">
                    <Dropdown.Item>
                      <Link
                        to={`/app/profile/:${username}`}
                        className="dropdown__item"
                      >
                        Profile
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <Link to="/logout" className="dropdown__item">
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md="auto">
                {notification ? (
                  <span>
                    <i className="fas fa-bell fa-lg">
                      <span className="notification-no">10</span>
                    </i>
                  </span>
                ) : (
                  <i className="far fa-bell fa-lg" />
                )}
              </Col>
            </>
          )}
        </Navbar>
      </div>
    );
  }
}

export default Header;
