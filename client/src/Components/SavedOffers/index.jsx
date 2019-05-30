import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import OfferCard from '../CommonComponents/OfferCard';
import offersDetails from './staticData';
import './style.css';

export default class SavedOffers extends Component {
  state = {
    offers: null,
  };

  componentDidMount() {
    this.setState({ offers: offersDetails });
  }

  render() {
    const { offers } = this.state;
    return (
      <Container class="page__container">
        <h1 className="saved-offer-title"> Saved Offers </h1>
        {offers
          ? offers.map(item => {
              if (item.saved) {
                return (
                  <OfferCard
                    hover
                    offer={item}
                    key={item.id}
                    status={item.status}
                  />
                );
              }
            })
          : null}
      </Container>
    );
  }
}
