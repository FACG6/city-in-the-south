import React, { Component } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import OfferCard from '../CommonComponents/OfferCard';

import offersDetails from './staticData';

import './style.css';

export default class SavedOffers extends Component {
  state = {
    offers: null,
  };

  componentDidMount() {
    // here we will make a request to the back to get the saved-offers
    this.setState({ offers: offersDetails });
  }

  render() {
    const { offers } = this.state;
    return (
      <Container className="page__container">
        <h1 className="saved-offer__title"> Saved Offers </h1>
        {offers ? (
          offers.map(item => {
            return (
              <OfferCard
                hover
                offer={item}
                key={item.id}
                status={item.status}
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
