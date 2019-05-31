import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import './style.css';

export default class CreateOffer extends Component {
  state = {};

  // `POST` : `/api/v1/offers`
  // body:
  // data: {
  //     title: 'Ui application for website',
  //     position: 'front end developer',
  //     description: 'lorem ipsum',
  //     skills: [1, 2, 3], // skills id
  //     offer_type: [2,3,3],  //offer_type id
  //     member_id: 2,
  //   }

  render() {
    return (
      <Container className="page__container newoffer__container">
        <h1 className="newoffer-head__title"> New Offer </h1>
        <div className="newoffer__content">
          <Row>
            <Col sm={12} md={12} lg={6}>
              <Form>
                <Form.Group>
                  <Form.Label> Title: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:  Small Shop seeks workers "
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Position: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:   Marketing Manager"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col sm={12} md={12} lg={6}>
              auto complete tags
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group>
                  <Form.Label> Description: </Form.Label>
                  <Form.Control
                    as="textarea"
                    className="newoffer__content--description"
                    rows="3"
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>auto complete tags</Row>
          <Row>
            <Col sm={12} md={12} lg={1}>
              <Button className="newoffer__content-btn newoffer__content-btn--apply">
                Apply
              </Button>
            </Col>
            <Col sm={12} md={12} lg={1}>
              <Button className="newoffer__content-btn newoffer__content-btn--cancel">
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}
