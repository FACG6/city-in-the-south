import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './style.css';
import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
// dummy data
import offerData from '../utils/offer';
import applicationsData from '../utils/applications';

export default class OfferDetails extends Component {
  state = {
    // default value, should be removed if fetch offer details implemented
    offer: {},
    applications: [],
    userInfo: {
      id: 1,
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    },
  };

  componentDidMount() {
    const offerIdLength = window.location.href.split('/').length;
    const offerId = window.location.href.split('/')[offerIdLength - 1];
    // fetch offer details by offerId and save it in state
    this.setState({ offer: offerData });
    // fetch applications by offerId and save it in state
    this.setState({ applications: applicationsData });
    // take logged in userInfo from local storage and store it in state
    // const userInfo = localStorage.getItem('userInfo');
    // this.setState(userInfo);
  }

  offerColor = status => {
    switch (status) {
      case 'completed':
      case 'accepted':
        return 'green';
      case 'pending':
        return '#1BA7E2';
      case 'in_progress':
        return 'orange';
      case 'finished':
      case 'refused':
        return 'red';
      default:
        return null;
    }
  };

  handleEndContract = () => {
    // handle end contract login here....
  };

  render() {
    const { offer } = this.state;
    const { applications } = this.state;
    const offerColor = this.offerColor(offer.status);
    const { id: memberId } = this.state.userInfo;

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
            <Button
              className="offet-details__end-button"
              variant="danger"
              onClick={this.handleEndContract}
            >
              End Contract
            </Button>
          </Col>
        </Row>
        <Row className="offer-details__row">
          <Col xs lg="9" className="offer-details__description">
            <Row>
              <p>{offer.description}</p>
            </Row>
          </Col>
          <Col xs lg="2">
            <div>
              <SideCard title="skills" items={offer.skills} />
              <SideCard title="offer type" items={offer.offer_type} />
            </div>
          </Col>
        </Row>
        {memberId === offer.member_id ? (
          // {/* applications */}
          <div>
            <Row className="offer-details__Applications-title">
              Applications
            </Row>
            <Col xs lg="9" style={{ padding: '0px' }}>
              {applications &&
                applications.map(item => (
                  <div key={item.member_id}>
                    <ApplicationCard
                      application={item}
                      offerColor={this.offerColor}
                    />
                  </div>
                ))}
            </Col>
          </div>
        ) : (
          // if logged in member is not offer owner
          <div>if logged in member is not offer owner</div>
        )}
      </Container>
    );
  }
}
