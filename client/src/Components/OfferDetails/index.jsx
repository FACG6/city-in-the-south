import React, { Component } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
// dummy data
import offerData from '../utils/offer';
import applicationsData from '../utils/applications';

import './style.css';

export default class OfferDetails extends Component {
  state = {
    // default value, should be removed if fetch offer details implemented
    offer: {},
    applications: [],
    userInfo: {
      id: 3,
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    },
  };

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      match: { params: offerId },
    } = this.props;
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
        return '#0A8F07';
      case 'pending':
        return '#F77D0E';
      case 'finished':
      case 'refused':
        return 'red';
      case 'inactive':
        return '#1BA7E2';
      default:
        return null;
    }
  };

  handleEndContract = () => {
    // handle end contract login here....
  };

  render() {
    // get useInfo from local storage
    // const userInfo = localStorage.getItem('userInfo');
    const userInfo = {
      id: 3,
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    };
    const { offer, applications } = this.state;
    const offerColor = this.offerColor(offer.status);
    const { id: memberId } = userInfo;
    const memberApplication = applications.filter(
      application => application.member_id === memberId
    );
    console.log(memberApplication);
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
          (!memberApplication[0] && (
            <Col xs lg="9" className="offer-details__proposal-container">
              <Form.Control
                as="textarea"
                rows="8"
                placeholder="Write your proposal here !!!"
                style={{ marginBottom: '10px' }}
              />
              <Button className="offer-details__proposal-container__button">
                Apply
              </Button>
            </Col>
          )) ||
          (offer.status && memberApplication[0] && (
            <Col xs lg="9">
              <ApplicationCard
                application={memberApplication[0]}
                offerColor={this.offerColor}
                viewMyProfile
              />
            </Col>
          ))
        )}
      </Container>
    );
  }
}
