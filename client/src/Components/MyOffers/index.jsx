import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Container, Spinner, Alert } from 'react-bootstrap';

import PageTitle from '../CommonComponents/PageTitle';

import './style.css';

class MyOffers extends Component {
  state = {
    offers: null,
    showWrongAlert: false,
  };

  componentDidMount() {
    const { id } = JSON.parse(localStorage.getItem('userInfo'));
    fetch(`/api/v1/my-offers/${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => this.setState({ offers: res.data }))
      .catch(() =>
        this.setState(
          {
            showWrongAlert: true,
          },
          () =>
            setTimeout(() => {
              this.setState({ showWrongAlert: false });
            }, 5000)
        )
      );
  }

  statusClassName = status => {
    return `myoffers__status--${status}`;
  };

  render() {
    const { offers, showWrongAlert } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    return (
      <>
        {showWrongAlert && <Alert> Somthing went error! Try agailn </Alert>}
        {offers && offers.length ? (
          <Container className="page__container">
            <PageTitle title="My Offers" />
            <Row>
              {offers ? (
                offers.map(item => {
                  return (
                    <Col xs={12} md={6} lg={3} key={item.id}>
                      <Card
                        className="myoffer__card"
                        key={item.id}
                        onClick={() => history.push(`/app/offers/${item.id}`)}
                      >
                        <Card.Header className="myoffer__card-header">
                          <Card.Text
                            className={`myoffers__status ${this.statusClassName(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </Card.Text>
                        </Card.Header>
                        <Card.Body className="myoffers__body">
                          <Card.Text className="myoffers__title">
                            {item.title}
                          </Card.Text>
                          <Card.Text className="myoffers__position">
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
        ) : (
          <h2 className="offer-empty">There are no offers to show!!</h2>
        )}
      </>
    );
  }
}

export default withRouter(MyOffers);
