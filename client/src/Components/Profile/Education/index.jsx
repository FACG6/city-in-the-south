import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './style.css';

// eslint-disable-next-line react/prop-types
export default function Education({ education, hover }) {
  return (
    <Row className={hover ? 'education-hover' : ''}>
      <Col lg={4} md={4} sm={3} xs={12}>
        <br />
        <div>
          <h3 className="profile__education_title">{education.title}</h3>
        </div>
        <p className="profile__education_date">{education.date}</p>
      </Col>
      <Col lg={8} md={8} sm={9} xs={12}>
        <br />
        <div>
          <span className="profile__education__un">{education.university}</span>
          <span
            className="education__icons"
            style={hover ? { display: 'block' } : { display: 'none' }}
          >
            {' '}
            <i className="fa fa-trash" aria-hidden="true" />{' '}
          </span>
        </div>
        <p className="profile_education_desc">{education.description}</p>
      </Col>
    </Row>
  );
}
