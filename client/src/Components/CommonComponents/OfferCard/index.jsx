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
  };

  componentDidMount() {
    const { offer, status } = this.props;
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
      memberId:
        JSON.parse(localStorage.getItem('userInfo')) &&
        JSON.parse(localStorage.getItem('userInfo')).id,
    });
    const memberId =
      JSON.parse(localStorage.getItem('userInfo')) &&
      JSON.parse(localStorage.getItem('userInfo')).id;
    fetch(`/api/v1/saved-offers/${memberId}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          res.data.filter(savedOffer => {
            if (offer.id === savedOffer.id) {
              this.setState({ saved: true });
            } else {
              this.setState({ saved: false });
            }
          });
        } else {
          throw new Error();
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
    if (saved) {
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
          if (res.error) {
            throw new Error();
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
    } else {
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
          } else {
            throw new Error();
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

  render() {
    const {
      offer,
      hovered,
      statusLabel,
      statusDiv,
      errMSg,
      showAlert,
      variant,
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
            key={offer.id}
            onClick={() => history.push(`/app/offers/${offer.id}`)}
          >
            {hover ? (
              <span className={`offer-card__border ${statusDiv}`}> </span>
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
                  this.handleSave(offer.id);
                }}
                className="offer-card__save-btn"
              >
                <i
                  className={`fas fa-bookmark offer-card__favourite ${this.savedClassStatus()}`}
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
