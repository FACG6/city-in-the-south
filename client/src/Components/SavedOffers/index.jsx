import React, { Component } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';

import OfferCard from '../CommonComponents/OfferCard';

import './style.css';

export default class SavedOffers extends Component {
  state = {
    offers: null,
    message: '',
  };

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { id } = userInfo;
    fetch(`/api/v1/saved-offers/${id}`)
      .then(res => res.json())
      .then(({ data, error }) => {
        if (data) this.setState({ offers: data });
        else this.setState({ message: error.msg });
      })
      .catch(er => {
        this.setState({ message: er.message });
      });
  }

  handleDelete = offer_id => {
    const { offers } = this.state;
    const newOffers = offers.filter(offer => offer.offer_id !== offer_id);
    this.setState({ offers: newOffers });
  };

  render() {
    const { offers, message } = this.state;
    return (
      <Container className="page__container">
        <h1 className="saved-offer__title"> Saved Offers </h1>
        {message && <Alert variant="danger">{message}</Alert>}
        {offers ? (
          offers.map(item => {
            return (
              <OfferCard
                hover
                offer={item}
                key={item.offer_id}
                status={item.status}
                handleDelete={this.handleDelete}
              />
            );
          })
        ) : (
          <div className="saved-offer__spinner">
            {' '}
            <Spinner animation="border" variant="info" />
          </div>
        )}
      </Container>
    );
  }
}
