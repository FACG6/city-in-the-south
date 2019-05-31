import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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

  offerColor = status => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return '#1BA7E2';
      case 'in_progress':
        return 'orange';
      case 'finished':
        return 'red';
      default:
        return null;
    }
  };

  render() {
    const { offer } = this.state;
    const offerColor = this.offerColor(offer.status);
    return (
      <Container className="page__container">
        <Row className="offer-details__header">
          <Col className="offer-details__header-col">
            <span className="offer-details__position">{offer.position}</span>
            <p className="offer-details__title">{offer.title}</p>
          </Col>

          <Col className="offer-details__status" md="auto">
            <span style={{ color: offerColor }}>
              {offer.status
                ? offer.status.replace(/_/g, ' ').toUpperCase()
                : null}
            </span>
            <Button className="offet-details__end-button" variant="danger">
              End Contract
            </Button>
          </Col>
        </Row>
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
