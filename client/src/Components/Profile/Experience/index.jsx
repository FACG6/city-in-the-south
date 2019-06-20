import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './style.css';

// eslint-disable-next-line react/prop-types
export default function Experience({ experience }) {
  return (
    <Row>
      <Col lg={4} md={4} sm={3} xs={12}>
        <br />
        <h3 className="profile__experience_title">{experience.title}</h3>
        <p className="profile__experience_date">
          {experience.startDate} - {experience.endDate}{' '}
        </p>
      </Col>
      <Col lg={8} md={8} sm={9} xs={12}>
        <h3 className="profile__experience__un">{experience.location}</h3>
        <p className="profile_experience_desc">{experience.description}</p>
      </Col>
    </Row>
  );
}
