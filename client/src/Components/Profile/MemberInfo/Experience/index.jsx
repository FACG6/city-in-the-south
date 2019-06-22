import React, { Component } from 'react';
import { Row, Col, Container, Spinner, Alert } from 'react-bootstrap';

import './style.css';

export default class Experience extends Component {
  state = {
    experiences: '',
    userInfo: '',
    showAlert: false,
  };

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ userInfo });
    const { memberName, memberId } = this.props;
    fetch(`/api/v1/experience/${memberId}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          // console.log(33,res.data);
          this.setState({ experiences: res.data });
        } else {
          throw new Error();
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
    const { experiences, showAlert } = this.state;
    return (
      <Container>
        {showAlert && <Alert>Somthing went error ! Try again.</Alert>}
        {experiences ? (
          <Row>
            <Col lg={4}>
              <h2 className="profile__title">EXPERIENCE</h2>
              <h3 className="profile__experience_title">{experiences.title}</h3>
              <p className="profile__experience_date">
                {experiences.start_date} - {experiences.end_date}{' '}
              </p>
            </Col>
            <Col lg={8}>
              <h3 className="profile__experience__un">
                {experiences.location}
              </h3>
              <p className="profile_experience_desc">
                {experiences.description}
              </p>
            </Col>
          </Row>
        ) : (
          <Spinner animation="grow" variant="info" />
        )}
      </Container>
    );
  }
}
