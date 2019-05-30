import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import offersDetails from '../utilis/myOffers';
import './style.css';

class MyOffers extends Component {
  state = {
    offers: null,
  };

  componentDidMount() {
    // send the request to the backend to get offers (by member_id 'take it from local storage')
    // use `GET` : `/api/v1/my-offers/:memberId`
    // the response will be as { error: null, data: [ { // offer details } ] }
    // this.setState({ offers: result.data });
    this.setState({ offers: offersDetails });
  }

  statusClassName = status => {
    switch (status) {
      case 'completed':
        return 'myOffer__card--completed';
      case 'pending':
        return 'myOffer__card--inProgress';
      case 'ended':
        return 'myOffer__card--ended';
      case 'finished':
        return 'myOffer__card--finished';
      default:
        return 'offer__card--activeStatus';
    }
  };

  render() {
    const { offers } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    return (
      <Container className="page__container ">
        <div className="myOffers-head">
          <h1 className="myOffers-head__title"> My Offers </h1>
        </div>
        <Row>
          {offers ? (
            offers.map(item => {
              return (
                <Col xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    className="card-myOffers"
                    key={item.id}
                    onClick={() => history.push(`/app/offers/${item.id}`)}
                  >
                    <Card.Header className="card-myOffers__header">
                      <Card.Text
                        className={`myoffers-card__status ${this.statusClassName(
                          item.status
                        )}`}
                      >
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
                </Col>
              );
            })
          ) : (
            <Spinner animation="border" variant="info" />
          )}
        </Row>
      </Container>
    );
  }
}

export default withRouter(MyOffers);
