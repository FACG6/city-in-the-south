import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Image, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import statusColor from '../../Helper/helper';

import './style.css';

class ApplicationCard extends Component {
  state = { application: '' };

  componentDidMount() {
    const { application } = this.props;
    this.setState({ application });
  }

  handleProfile = () => {
    // eslint-disable-next-line react/prop-types
    const { application: username, history } = this.props;
    history.push(`/app/profile/${username}`);
  };

  handleHireMe = () => {
    // handle hire me button
    // const { member_id: applicantMemberId } = this.props.application;
  };

  render() {
    const { application } = this.state;
    const { defaultAvatar, viewProfile } = this.props;
    return (
      <>
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
                  <Button
                    className="application-card__button"
                    onClick={this.handleHireMe}
                  >
                    Hire Me
                  </Button>
                ) : (
                  <Card.Text
                    className={`status__${statusColor(application.status)}`}
                  >
                    {application.status.replace(/_/g, ' ').toUpperCase()}
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
};

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    member_id: PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    proposal: PropTypes.string.isRequired,
    // status: PropTypes.string.isRequired,
  }).isRequired,
  viewProfile: PropTypes.bool,
  defaultAvatar: PropTypes.string.isRequired,
};
