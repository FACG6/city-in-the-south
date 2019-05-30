import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import offerData from '../utils/offer';
import SideCard from './SideCard';

export default class OfferDetails extends Component {
  state = {
    // default value, should be removed if fetch offer details implemented
    offer: {},
  };

  componentDidMount() {
    const offerIdLength = window.location.href.split('/').length;
    const offerId = window.location.href.split('/')[offerIdLength - 1];
    // fetch offer details by offerId and save it in state
    this.setState({ offer: offerData });
  }

  render() {
    const { offer } = this.state;
    return (
      <Container className="page__container">
        <div className="offer-details__header">
          <span className="offer-details__position">{offer.position}</span>
          <p className="offer-details__title">{offer.title}</p>
        </div>
        <Row className="offer-details__row">
          <Col xs lg="9" className="offer-details__description">
            <p>{offer.description}</p>
          </Col>
          <Col xs lg="2">
            <div>
              <SideCard title="skills" items={offer.skills} />
              <SideCard title="offer type" items={offer.offer_type} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
