import React from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';

class OfferCard extends React.Component {
  state = {
    offer: null,
    statusLabel: '',
    statusDiv: '',
    hovered: '',
    saved: false,
    memberId: 0,
    offerId: '',
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { offer, status, id } = this.props;
    const borderColor = {
      completed: 'green',
      finished: 'red',
      pending: 'orange',
      active: 'blue',
      errMSg: '',
      showAlert: false,
      variant: '',
    };
    this.setState({
      offerId: id,
      memberId:
        (JSON.parse(localStorage.getItem('userInfo')) &&
          JSON.parse(localStorage.getItem('userInfo')).id) ||
        'guest',
    });
    const memberId =
      (JSON.parse(localStorage.getItem('userInfo')) &&
        JSON.parse(localStorage.getItem('userInfo')).id) ||
      'guest';
    if (memberId !== 'guest') {
      fetch(`/api/v1/saved-offers/${memberId}`, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          if (res.data) {
            return res.data;
          }
        })
        .then(result => {
          result.map(savedOffer => {
            if (offer.id === savedOffer.offer_id)
              this.setState({ saved: true });
          });
        })
        .catch(() =>
          this.setState(
            {
              errMSg: 'Something went wrong',
              showAlert: true,
              variant: 'danger',
            },
            () =>
              setTimeout(() => {
                this.setState({ errMSg: '', showAlert: false });
              }, 3000)
          )
        );
    }
    this.setState(() => {
      return {
        offer,
        statusLabel: `offer-card__status--${status}`,
        statusDiv: `offer-card__border--${borderColor[status]}`,
      };
    });
  }

  savedClassStatus = () => {
    const { saved } = this.state;
    if (saved) return 'offer-card__favourite--saved';
    return 'offer-card__favourite--unsaved';
  };

  handleSave = id => {
    const { saved, memberId } = this.state;
    // eslint-disable-next-line react/prop-types
    const { handleDelete } = this.props;
    if (saved && memberId !== 'guest') {
      fetch(`/api/v1/saved-offers/${memberId}`, {
        method: 'DELETE',
        body: JSON.stringify({ offerId: id }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.data) {
            if (handleDelete) {
              handleDelete(id);
              this.setState(
                {
                  saved: false,
                  errMSg: 'Deleted successfully ',
                  showAlert: true,
                  variant: 'success',
                },
                () =>
                  setTimeout(() => {
                    this.setState({ errMSg: '', showAlert: false });
                  }, 1000)
              );
              return;
            }
            this.setState(
              {
                saved: false,
                errMSg: 'Deleted successfully ',
                showAlert: true,
                variant: 'success',
              },
              () =>
                setTimeout(() => {
                  this.setState({ errMSg: '', showAlert: false });
                }, 1000)
            );
          }
        })
        .catch(() =>
          this.setState(
            {
              errMSg: 'Something went wrong',
              showAlert: true,
              variant: 'danger',
            },
            () =>
              setTimeout(() => {
                this.setState({ errMSg: '', showAlert: false });
              }, 3000)
          )
        );
    } else if (!saved && memberId !== 'guest') {
      fetch('/api/v1/saved-offers', {
        method: 'POST',
        body: JSON.stringify({ memberId, offerId: id }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.data) {
            this.setState(
              {
                saved: true,
                errMSg: 'Added successfully ',
                showAlert: true,
                variant: 'success',
              },
              () =>
                setTimeout(() => {
                  this.setState({ errMSg: '', showAlert: false });
                }, 1000)
            );
          }
        })
        .catch(() =>
          this.setState(
            {
              errMSg: 'Something went wrong',
              showAlert: true,
              variant: 'danger',
            },
            () =>
              setTimeout(() => {
                this.setState({ errMSg: '', showAlert: false });
              }, 3000)
          )
        );
    }
  };

  handleHover = () => this.setState({ hovered: 'offer-card--hovered' });

  handleOnClick = () => {
    const { memberId, offerId } = this.state;
    const {
      // eslint-disable-next-line react/prop-types
      history: { push },
    } = this.props;
    if (memberId === 'guest') {
      push('/app/login');
    } else {
      push(`/app/offers/${offerId}`);
    }
  };

  render() {
    const {
      offer,
      hovered,
      statusLabel,
      statusDiv,
      errMSg,
      showAlert,
      variant,
      offerId,
    } = this.state;
    // eslint-disable-next-line react/prop-types
    const { hover, history } = this.props;
    return (
      <>
        <Alert show={showAlert} key={1} variant={variant}>
          {errMSg}
        </Alert>
        {offer ? (
          <Card
            className={`offer-card ${hovered ? 'offer-card--hovered' : ''}`}
            key={`offer${offer.id}`}
            // onClick={() => history.push(`/app/offers/${offerId}`)}
            onClick={this.handleOnClick}
          >
            {hover ? (
              <span className={`offer-card__border ${statusDiv}`} />
            ) : null}
            <Card.Header className="offer-card__header">
              <div>
                <span className="offer-card__position">{offer.position}</span>
                <br />
                <span className="offer-card__title">{offer.title}</span>
              </div>
              {hover ? (
                <span className={`offer-card__status ${statusLabel}`}>
                  {' '}
                  {offer.status}
                </span>
              ) : null}
              <Button
                onClick={e => {
                  e.stopPropagation();
                  this.handleSave(offerId);
                }}
                className="offer-card__save-btn"
              >
                <i
                  className={`fas fa-bookmark offer-card__favourite  ${this.savedClassStatus()}`}
                >
                  {' '}
                </i>
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Text className="offer-card__description">
                {offer.description && offer.description.substring(0, 300)}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <>
            <Spinner animation="border" variant="info" />
          </>
        )}
      </>
    );
  }
}

export default withRouter(OfferCard);

OfferCard.defaultProps = {
  offer: {},
  hover: '',
  status: 'active',
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    position: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    saved: PropTypes.bool,
  }),
  hover: PropTypes.bool,
  status: PropTypes.string,
};
