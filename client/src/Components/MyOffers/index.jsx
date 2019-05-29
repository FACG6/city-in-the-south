import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import offersDetails from '../utilis/offers';
import './style.css';

class MyOffers extends Component {
  state = {
    offers: null,
  };

  componentDidMount() {
    this.setState({ offers: offersDetails });
    // console.log(offersDetails);
    // const { offers } = this.state;
    //   offersDetails.map(item => {
    //     console.log(item.status);
    //   })
  }

  statusClassName = status => {
    // const { statusLabel } = this.state;
    // console.log(status);
    switch (status) {
      case 'completed':
        return 'myOffer__card--completed';
      case 'in progress':
        return 'myOffer__card--inProgress';
      case 'ended':
        return 'myOffer__card--ended';
      default:
        return 'offer__card--activeStatus';
    }
  };

  render() {
    // console.log(this.state.offers);
    const { offers } = this.state;
    return (
      <Container>
        {offers ? (
          offers.map(item => {
            return (
              <Card bg="light" style={{ width: '18rem' }} key={item.id}>
                <Card.Header className="card__myOffers--header">
                  <Card.Text className={this.statusClassName(item.status)}>
                    {item.status}
                  </Card.Text>
                </Card.Header>
                <Card.Body className="card__myOffers--body">
                  <Card.Text className="card__myOffers--title">
                    {item.title}
                  </Card.Text>
                  <Card.Text className="card__myOffers--position">
                    {item.position}
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <span> loading... </span>
        )}
      </Container>
    );
  }
}

export default withRouter(MyOffers);
