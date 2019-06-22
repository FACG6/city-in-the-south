import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import './style.css';

// eslint-disable-next-line react/prop-types
export default class Education extends Component {
  state = {
    educations: '',
    memberId: '',
    showAlert: false,
  };

  componentDidMount() {
    const { memberId } = this.props;
    this.setState({ memberId });
    fetch(`/api/v1/education/${memberId}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState({ educations: res.data });
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
    const { educations } = this.state;
    return (
      <Row>
        <Col lg={4} md={4}>
          <h2 className="profile__title">EDUCATION</h2>
          <br />
          <div>
            <h3 className="profile__education_title">{educations.title}</h3>
          </div>
          <p className="profile__education_date">{educations.date}</p>
        </Col>
        <Col lg={8} md={8}>
          <br />
          <div>
            <span className="profile__education__un">
              {educations.university}
            </span>
          </div>
          <p className="profile_education_desc">{educations.description}</p>
        </Col>
      </Row>
    );
  }
}
