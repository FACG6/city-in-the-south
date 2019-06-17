import React, { Component } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

import SideCard from './SideCard';
import ApplicationCard from './ApplicationCard';
import CoverLetter from './CoverLetter';
import PageNotFound from '../PageNotFound/index';

import statusColor from '../Helper/helper';

import './style.css';

export default class OfferDetails extends Component {
  state = {
    userInfo: '',
    offerId: '',
    offer: '',
    applications: '',
    myApplication: '',
    showWrongAlert: '',
  };

  componentDidMount() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const {
      // eslint-disable-next-line react/prop-types
      params: { offerId },
    } = this.props.match;
    this.setState({ userInfo, offerId });

    // fetch offerDetails by offer_id
    fetch(`/api/v1/offer/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => this.setState({ offer: res.data }))
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

    // fetch applications by offerId and save it in state
    fetch(`/api/v1/offer-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => this.setState({ applications: res }))
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

    const { id } = userInfo;
    // fetch myApplication by userId and offerId
    fetch(`/api/v1/${id}/my-applications/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(myApplication => this.setState({ myApplication }))
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

  handleEndContract = () => {
    const { offerId } = this.state;
    fetch(`/api/v1/offer/${offerId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        offerId,
        status: 'finished',
      }),
    })
      .then(res => res.json())
      .then(res => {
        const { status } = res.data[0];
        this.setState(prevState => {
          const updatedOffer = { ...prevState.offer[0] };
          updatedOffer.status = status;
          return { offer: updatedOffer };
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

  render() {
    const {
      offer,
      offerId,
      applications,
      userInfo,
      myApplication,
      showWrongAlert,
    } = this.state;
    const { data } = applications;
    return (
      <>
        {showWrongAlert && <Alert> Somthing went error! Try agailn </Alert>}
        {offer && offer.length ? (
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
                  <span className={`status__${statusColor(offer[0].status)}`}>
                    {offer[0].status}
                  </span>
                  {offer && offer[0] && offer[0].status === 'completed' && (
                    <Button
                      className="offet-details__end-button"
                      variant="danger"
                      onClick={this.handleEndContract}
                    >
                      End Contract
                    </Button>
                  )}
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
                          viewProfile
                          hireMe={offer[0].status !== 'finished'}
                          defaultAvatar={userInfo.avatar}
                          key={Math.random()}
                          application={item}
                        />
                      );
                    })}
                  {!applications ||
                    (!applications.data.length && (
                      <>
                        <span>there is no Application to show.</span>
                      </>
                    ))}
                </Col>
              </>
            ) : (
              <>
                {myApplication &&
                myApplication.data &&
                myApplication.data.length ? (
                  <>
                    <ApplicationCard
                      key={Math.random()}
                      application={myApplication.data[0]}
                    />
                  </>
                ) : (
                  <>
                    <CoverLetter offer_id={offerId} userInfo={userInfo} />
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
