/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Image, Card, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import statusColor from '../../Helper/helper';

import './style.css';

class ApplicationCard extends Component {
  state = {
    application: '',
    userInfo: '',
    showWrongAlert: false,
  };

  componentDidMount() {
    const { application } = this.props;
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    this.setState({ application, userInfo });
  }

  handleProfile = () => {
    const {
      application: { username },
      // eslint-disable-next-line react/prop-types
      history,
    } = this.props;
    history.push(`/app/profile/${username}`);
  };

  handleHireMe = () => {
    const { application, match } = this.props;
    const { member_id } = application;
    const {
      // eslint-disable-next-line react/prop-types
      params: { offerId },
    } = match;
    fetch('/api/v1/hired-member', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        member_id,
        offer_id: offerId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const { status } = res.data[0];
          this.setState(prevState => {
            const newApplication = { ...prevState.application };
            newApplication.status = status;
            return { application: newApplication };
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

  handleAccept = () => {
    const { userInfo } = this.state;
    const { match } = this.props;
    const {
      params: { offerId },
    } = match;
    fetch(`/api/v1/hired-member/${userInfo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ offer_id: offerId, status: 'accepted' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const { status } = res.data[0];
          this.setState(prevState => {
            const updatedApp = { ...prevState.application };
            updatedApp.status = status;
            return { application: updatedApp };
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

  handleRefuse = () => {
    const { userInfo } = this.state;
    const { match } = this.props;
    const {
      params: { offerId },
    } = match;
    fetch(`/api/v1/hired-member/${userInfo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ offer_id: offerId, status: 'refused' }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const { status } = res.data[0];
          this.setState(prevState => {
            const updatedApp = { ...prevState.application };
            updatedApp.status = status;
            return { application: updatedApp };
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
    const { application, userInfo, showWrongAlert } = this.state;
    const { defaultAvatar, viewProfile, hireMe } = this.props;
    return (
      <>
        {showWrongAlert && <Alert> Somthing went error! Try agailn </Alert>}
        <div className="application-card__container">
          <Card style={{ borderColor: '#eaeaea' }}>
            <Card.Header>
              <Card.Title>
                <Image
                  src={application.avatar ? application.avatar : defaultAvatar}
                  className="application-card__avatar"
                />
                <span style={{ paddingLeft: '10px' }}>
                  {application.full_name}
                </span>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ color: 'rgba(51, 51, 51, 0.8)' }}>
                {application.proposal}
              </Card.Text>
              <div className="application-card__button__container">
                {viewProfile && (
                  <Button
                    className="application-card__button"
                    onClick={this.handleProfile}
                  >
                    {' '}
                    View Profile
                  </Button>
                )}
                {!application.status ? (
                  <>
                    {hireMe && (
                      <Button
                        className="application-card__button"
                        onClick={this.handleHireMe}
                      >
                        Hire Me
                      </Button>
                    )}
                  </>
                ) : (
                  <Card.Text>
                    {userInfo.id === application.member_id &&
                    application.status &&
                    application.status === 'pending' ? (
                      <>
                        <Button
                          className="application-card__button refuse-btn"
                          onClick={this.handleRefuse}
                        >
                          Refuse
                        </Button>
                        <Button
                          className="application-card__button accept-btn"
                          onClick={this.handleAccept}
                        >
                          Accept
                        </Button>
                      </>
                    ) : (
                      <span
                        className={`status__${statusColor(application.status)}`}
                      >
                        {application.status}
                      </span>
                    )}
                  </Card.Text>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default withRouter(ApplicationCard);

ApplicationCard.defaultProps = {
  viewProfile: false,
  hireMe: false,
};

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    member_id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    proposal: PropTypes.string.isRequired,
  }).isRequired,
  viewProfile: PropTypes.bool,
  hireMe: PropTypes.bool,
  defaultAvatar: PropTypes.string.isRequired,
};
