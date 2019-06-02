import React, { Component } from 'react';
import { Image, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './style.css';

class ApplicationCard extends Component {
  state = {};

  handleProfile = () => {
    // handle profile button
    const { member_id: applicantMemberId } = this.props.application;
  };

  handleHireMe = () => {
    // handle hire me button
    const { member_id: applicantMemberId } = this.props.application;
  };

  render() {
    const {
      full_name: fullName,
      avatar,
      discription,
      status,
    } = this.props.application;
    const offerColor = this.props.offerColor(status);
    const { viewMyProfile } = this.props;

    return (
      <div className="application-card__container">
        <Card style={{ borderColor: '#eaeaea' }}>
          <Card.Header>
            <Card.Title>
              <Image src={avatar} className="application-card__avatar" />
              <span style={{ paddingLeft: '10px' }}>{fullName}</span>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{discription}</Card.Text>
            <div className="application-card__button__container">
              <Button
                className="application-card__button"
                onClick={this.handleProfile}
              >
                {viewMyProfile ? 'View My Profile' : 'View Profile'}
              </Button>
              {!status ? (
                <Button
                  className="application-card__button"
                  onClick={this.handleHireMe}
                >
                  Hire Me
                </Button>
              ) : (
                <Card.Text style={{ color: offerColor, marginBottom: '5px' }}>
                  {status.replace(/_/g, ' ').toUpperCase()}
                </Card.Text>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ApplicationCard;

ApplicationCard.defaultProps = {
  viewMyProfile: false,
};

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    member_id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    discription: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  viewMyProfile: PropTypes.bool,
};
