import React, { Component } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';

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
    errorOffer: false,
  };

  componentDidMount() {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    const {
      // eslint-disable-next-line react/prop-types
      match: {
        params: { offerId },
      },
    } = this.props;
    this.setState({ userInfo, offerId });

    // fetch offerDetails by offer_id
    fetch(`/api/v1/offer/${offerId}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {
        if (res.data) {
          this.setState({ offer: res.data });
        } else this.setState({ errorOffer: true });
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
        if (res.data) {
          const { status } = res.data[0];
          this.setState(prevState => {
            const updatedOffer = { ...prevState.offer };
            updatedOffer.status = status;
            return { offer: updatedOffer };
          });
        }
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
      errorOffer,
    } = this.state;
    const { data } = applications;
    return (
      <>
        {showWrongAlert && <Alert> Somthing went error! Try agailn </Alert>}
        {!errorOffer && !offer && <Spinner animation="grow" variant="info" />}
        {errorOffer && <PageNotFound />}
        {!errorOffer && offer && (
          <Container className="offer__container">
            <Row className="offer-details__header">
              <Col className="offer-details__header-col">
                <span className="offer-details__position">
                  {offer.position}
                </span>
                <p className="offer-details__title">{offer.title}</p>
              </Col>
              <span className={`status__${statusColor(offer.status)}`}>
                {offer.status}
              </span>
              {offer.member_id === userInfo.id && (
                <>
                  {offer && offer.status === 'completed' && (
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
              <Col xs lg="10">
                <Row className="offer-details__description">
                  <p>{offer.description}</p>
                </Row>
              </Col>
              <Col xs lg="2" className="sideCard">
                <>
                  <SideCard title="skills" items={offer.skills} />
                  <SideCard title="offer type" items={offer.offer_types} />
                </>
              </Col>
            </Row>
            {offer.member_id === userInfo.id ? (
              <>
                <Col className="offer-details__Applications-title">
                  <span className="applications-title"> Applications </span>
                </Col>
                <Col xs lg="9">
                  {applications.data &&
                    data.map(item => {
                      return (
                        <ApplicationCard
                          viewProfile
                          hireMe={offer.status !== 'finished'}
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
                    <CoverLetter
                      offerId={Number(offerId)}
                      userInfo={userInfo}
                    />
                  </>
                )}
              </>
            )}
          </Container>
        )}
      </>
    );
  }
}
