import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Notification from './Notification';
import './style.css';

class Header extends Component {
  state = {
    userInfo: {
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    },
  };

  componentDidMount() {
    // const userInfo = localStorage.getItem('userInfo');
    // this.setState({ userInfo });
  }

  render() {
    const { islogged } = this.props;
    // default values
    const { fullName, username, avatar } = this.state.userInfo;

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
          </Col>
          {/* if the member is not logged in */}
          {!islogged && (
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
          {/* if the member is logged in */}
          {islogged && (
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
                {/* frop down menu to show member profile and logout */}
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="nav__dropdown"
                  >
                    <img src={avatar} alt="Avatar" className="nav__avatar" />{' '}
                    {'    '}
                    {fullName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown__menu-avatar">
                    <Dropdown.Item
                      as={Link}
                      to={`/app/profile/:${username}`}
                      className="dropdown__item"
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      as={Link}
                      to="/logout"
                      className="dropdown__item"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md="auto">
                {/* show notificatios component */}
                <Notification />
              </Col>
            </>
          )}
        </Navbar>
      </div>
    );
  }
}
// prop types validation
Header.propTypes = {
  islogged: PropTypes.bool.isRequired,
};

export default Header;
