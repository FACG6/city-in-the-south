import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Container,
  Modal,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';

import PageTitle from '../CommonComponents/PageTitle';

import './style.css';

class MyOffers extends Component {
  state = {
    offers: null,
    showWrongAlert: false,
    show: false,
    deletedOfferId: '',
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

  handleDeleteOffer = e => {
    e.stopPropagation();
    const { deletedOfferId } = this.state;
    fetch(`/api/v1/offers/${deletedOfferId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        this.setState({ show: false });
        this.setState(prevState => {
          const newOffers = prevState.offers.filter(
            offer => offer.id !== deletedOfferId
          );
          return { offers: newOffers };
        });
      })
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
  };

  handleClose = e => {
    e.stopPropagation();
    this.setState({ show: false });
  };

  handleShow(id) {
    this.setState({ deletedOfferId: id, show: true });
  }

  render() {
    const { offers, showWrongAlert, show } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    return (
      <>
        {showWrongAlert && <Alert> Somthing went error! Try agailn </Alert>}
        <Container className="page__container">
          <PageTitle title="My Offers" />
          {offers && offers.length ? (
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
                            <button
                              className="myoffers__delete"
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                this.handleShow(item.id);
                              }}
                            >
                              <i className="far fa-trash-alt myoffers__delete-icon" />
                            </button>
                            <Modal show={show} onHide={this.handleClose}>
                              <Modal.Body>
                                Are you sure to delete this offer ?!
                              </Modal.Body>
                              <Modal.Footer className="confirm__delete">
                                <Button
                                  variant="secondary"
                                  onClick={this.handleClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={this.handleDeleteOffer}
                                >
                                  Delete
                                </Button>
                              </Modal.Footer>
                            </Modal>
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
          ) : (
            <span>there is no offers to show</span>
          )}
        </Container>
      </>
    );
  }
}

export default withRouter(MyOffers);
