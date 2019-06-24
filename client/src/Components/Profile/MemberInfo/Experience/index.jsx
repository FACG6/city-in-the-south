import React, { Component } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';

import auth from '../../../../auth/auth';
import './style.css';

export default class Experience extends Component {
  state = {
    experiences: [],
    userInfo: '',
    showAlert: false,
    errExp: false,
  };

  componentDidMount() {
    const userInfo = auth.getUserInfo();
    this.setState({ userInfo });
    const { memberId } = this.props;
    fetch(`/api/v1/experience/${memberId}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data.length) {
          this.setState({ experiences: res.data });
        } else {
          this.setState({ errExp: true });
        }
      })
      .catch(() => {
        this.setState({ showAlert: true }, () =>
          setTimeout(() => {
            this.setState({ showAlert: false });
          }, 3000)
        );
      });
  }

  render() {
    const { experiences, showAlert, errExp } = this.state;
    return (
      <Row>
        <Col>
          <h2 className="profile__title">EXPERIENCE</h2>
          {showAlert && <Alert>Somthing went error ! Try again.</Alert>}
          {!errExp && !experiences[0] && (
            <Spinner animation="grow" variant="info" />
          )}
          {errExp && !experiences[0] && (
            <Col lg={12}>
              <h5 className="profile__empty-msg"> There is no experiences </h5>
            </Col>
          )}
          {!errExp &&
            experiences[0] &&
            experiences.map(experience => (
              <Row key={`experience-${experience.id}`}>
                <Col lg={5}>
                  <br />
                  <h3 className="profile__experience_title">
                    {experience.title}
                  </h3>
                  <p className="profile__experience_date">
                    {new Date(experience.start_date).toLocaleDateString()} -{' '}
                    {new Date(experiences[0].end_date).toLocaleDateString()}{' '}
                  </p>
                </Col>
                <Col lg={7}>
                  <h3 className="profile__experience__un">
                    {experience.location}
                  </h3>
                  <p className="profile_experience_desc">
                    {experience.description}
                  </p>
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    );
  }
}
