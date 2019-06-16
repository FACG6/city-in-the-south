import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Button, Form } from 'react-bootstrap';

class CoverLetter extends Component {
  state = {};

  render() {
    return (
      <Row xs lg="9" className="offer-details__proposal-container">
        <Form.Control
          as="textarea"
          rows="8"
          placeholder="Write your proposal here !!!"
          style={{ marginBottom: '10px' }}
        />
        <Button className="offer-details__proposal-container__button">
          Apply
        </Button>
      </Row>
    );
  }
}

export default (CoverLetter);
