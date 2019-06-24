import React, { Component } from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';

import './style.css';

// eslint-disable-next-line react/prop-types
export default class Education extends Component {
  state = {
    educations: [],
    memberId: '',
    showAlert: false,
    eduError: false,
  };

  componentDidMount() {
    const { memberId } = this.props;
    fetch(`/api/v1/education/${memberId}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data.length) {
          this.setState({ educations: res.data, memberId });
        } else this.setState({ eduError: true });
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
    const { educations, showAlert, eduError } = this.state;
    return (
      <Row>
        <Col>
          {showAlert ? <Alert>Somthing went error ! Try again.</Alert> : null}
          <h2 className="profile__title">EDUCATION</h2>
          {!eduError && !educations[0] && (
            <Spinner animation="grow" variant="info" />
          )}
          {eduError && !educations[0] && (
            <>
              <Col lg={12}>
                <h5 className="profile__empty-msg"> There is no educations </h5>
              </Col>
            </>
          )}
          {!eduError &&
            educations[0] &&
            educations.map(education => (
              <Row key={`education-${education.id}`}>
                <Col lg={5} md={4}>
                  <br />
                  <div>
                    <h3 className="profile__education_title">
                      {education.title}
                    </h3>
                  </div>
                  {/* <p className="profile__education_date">
                    {new Date(education.date).toLocaleDateString()}
                  </p> */}
                </Col>
                <Col lg={7} md={8}>
                  <br />
                  <div>
                    <span className="profile__education__un">
                      {education.university}
                      <span className="profile__education_date">
                        {new Date(education.date).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                  <p className="profile_education_desc">
                    {education.description}
                  </p>
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    );
  }
}
