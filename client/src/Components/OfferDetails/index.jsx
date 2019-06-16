import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
import PageNotFound from '../PageNotFound/index';

import offerColor from '../Helper/helper';

import './style.css';

export default class OfferDetails extends Component {
  state = {
    userInfo: '',
    offer: '',
    applications: '',
    myApplication: '',
  };

  componentDidMount() {
    // from localStorage
    const userInfo = {
      id: 1,
      fullName: 'Ayman AlQoqa',
      username: 'Ayman321396',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMTcxOTk4NzkwOV5BMl5BanBnXkFtZTcwMDE3MTUzNA@@._V1_.jpg',
    };
    this.setState({ userInfo });
    const {
      // eslint-disable-next-line react/prop-types
      params: { offerId },
    } = this.props.match;

    // fetch offerDetails by offer_id
    fetch(`/api/v1/offer/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => this.setState({ offer: res.data }))
      .catch(err => console.log(333, err));

    // fetch applications by offerId and save it in state
    fetch(`/api/v1/offer-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => this.setState({ applications: res }))
      .catch(err => console.log(333, err));

    const { id } = userInfo;
    // fetch myApplication by userId and offerId
    fetch(`/api/v1/${id}/my-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(myApplication => this.setState({ myApplication }))
      .catch(err => console.log('err', err));
  }

  // handleStatusColor = status => {
  //   switch (status) {
  //     case 'completed':
  //     case 'accepted':
  //       return '#0A8F07';
  //     case 'pending':
  //       return '#F77D0E';
  //     case 'finished':
  //     case 'refused':
  //       return 'red';
  //     case 'inactive':
  //       return '#1BA7E2';
  //     default:
  //       return null;
  //   }
  // };

  handleEndContract = () => {
    // handle end contract login here....
  };

  render() {
    const { offer, applications, userInfo, myApplication } = this.state;
    const { data } = applications;
    return (
      <>
        {offer.length ? (
          <Container className="page__container">
            <Row className="offer-details__header">
              <Col className="offer-details__header-col">
                <span className="offer-details__position">
                  {offer[0].position}
                </span>
                <p className="offer-details__title">{offer[0].title}</p>
              </Col>
              {offer[0].member_id === userInfo.id && (
                <>
                  <span>{offer[0].status}</span>
                  <Button
                    className="offet-details__end-button"
                    variant="danger"
                    onClick={this.handleEndContract}
                  >
                    End Contract
                  </Button>
                </>
              )}
            </Row>
            <Row className="offer-details__row">
              <Col xs lg="9" className="offer-details__description">
                <Row>
                  <p>{offer[0].description}</p>
                </Row>
              </Col>
              <Col xs lg="2">
                <div>
                  <SideCard title="skills" items={offer[0].skills} />
                  <SideCard title="offer type" items={offer[0].offer_types} />
                </div>
              </Col>
            </Row>
            {offer[0].member_id === userInfo.id ? (
              <>
                <Row className="offer-details__Applications-title">
                  Applications
                </Row>
                <Col xs lg="9" style={{ padding: '0px !important' }}>
                  {applications.data &&
                    data.map(item => {
                      return (
                        <ApplicationCard
                          defaultAvatar={userInfo.avatar}
                          key={Math.random()}
                          application={item}
                          offerColor={this.offerColor}
                        />
                      );
                    })}
                </Col>
              </>
            ) : (
              <>
                {(myApplication && myApplication.data) &&  myApplication.data.length ? (
                  <>
                    <>{console.log(777, myApplication.data[0])}</>
                    <ApplicationCard
                      key={Math.random()}
                      application={myApplication.data[0]}
                      offerColor={this.offerColor}
                    />
                  </>
                ) : (
                  <>
                    <span>cover letter</span>
                  </>
                )}
              </>
            )}
          </Container>
        ) : (
          <PageNotFound />
        )}
      </>
    );
  }
}
