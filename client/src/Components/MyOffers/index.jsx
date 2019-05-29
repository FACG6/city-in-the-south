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
  }

  statusClassName = status => {
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
    const { offers } = this.state;
    const { history } = this.props;
    return (
      <Container className="myOffers">
        {offers ? (
          offers.map(item => {
            return (
              <Card
                className="card__myOffers"
                key={item.id}
                onClick={() => history.push(`/app/offers/${item.id}`)}
              >
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
