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
        return 'card-myoffers__status--completed';
      case 'pending':
        return 'card-myoffers__status--pending';
      case 'finished':
        return 'card-myoffers__status--finished';
      default:
        return 'card-myoffers__status--active';
    }
  };

  render() {
    const { offers } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    return (
      <Container className="page__container myoffers-container">
        <div className="myOffers-head">
          <h1 className="card-myoffers-head__title"> My Offers </h1>
        </div>
        <Row>
          {offers ? (
            offers.map(item => {
              return (
                <Col xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    className="card-myoffers"
                    key={item.id}
                    onClick={() => history.push(`/app/offers/${item.id}`)}
                  >
                    <Card.Header className="card-myoffers__header">
                      <Card.Text
                        className={`card-myoffers__status ${this.statusClassName(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </Card.Text>
                    </Card.Header>
                    <Card.Body className="card-myoffers__body">
                      <Card.Text className="card-myoffers__body--title">
                        {item.title}
                      </Card.Text>
                      <Card.Text className="card-myoffers__body--position">
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
