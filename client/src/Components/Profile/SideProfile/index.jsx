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
            <h3 className="profile__username">{member.username}</h3>
          </Row>
          <Row>
            <Col>
              <h2 className="profile__title">CONTACT</h2>
              <div className="profile__contactInfo">
                {member.address && <p>{member.address}</p>}
                {member.email && <p>Email: {member.email}</p>}
                {member.phone && <p>Phone: {member.phone}</p>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
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
  // memberName: PropTypes.string.isRequired,
};
