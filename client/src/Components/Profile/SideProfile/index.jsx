import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Container, Alert } from 'react-bootstrap';

import './style.css';

export default class MemberInfo extends Component {
  state = {
    userInfo: {},
    member: '',
  };

  componentDidMount() {
    const { member } = this.props;
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo, member });
  }

  render() {
    const { userInfo, member, showAlert } = this.state;
    return (
      <Container>
        {showAlert && (
          <Alert variant="danger">Something went error! Try again.</Alert>
        )}
        <>
          <Row>
            <Col sm={4} lg={12} className='user__img'>
              <img
                src={
                  member.avatar
                    ? member.avatar
                    : 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
                }
                width="100%"
                alt={`${member.username} profile img`}
                className="profile__img"
              />
            </Col>
            <Col sm={6} lg={12}>
              <h3 className="profile__username">{member.username} </h3>
              <h2 className="profile__title">CONTACT</h2>
              <div className="profile__contactInfo">
                {member.address && <p>{member.address}</p>}
                {member.email && <p>Email: {member.email}</p>}
                {member.phone && <p>Phone: {member.phone}</p>}
              </div>
              <h2 className="profile__title">SKILLS</h2>
              <div className="profile__skills">
                {member.skills &&
                  member.skills.map(skill => (
                    <h6 key={`skill-${skill.id}`}> - {skill.name}</h6>
                  ))}
              </div>
            </Col>
          </Row>
        </>
      </Container>
    );
  }
}

MemberInfo.propTypes = {
  // member: PropTypes.string.isRequired, // object
};
