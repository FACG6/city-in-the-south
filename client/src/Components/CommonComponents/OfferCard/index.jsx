import React from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
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
  };

  componentDidMount() {
    const { offer, status } = this.props;
    const borderColor = {
      completed: 'green',
      finished: 'red',
      pending: 'orange',
      active: 'blue',
    };
    this.setState(() => {
      return {
        offer,
        saved: offer.saved,
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
    const { saved } = this.state;
    // send request to the backend to save (if this.state.saved === true) the offer
    // if this.state.saved is false, send request to unsave the offer
    // if(saved) axios.delete(`/api/v1/saved-offer/${id}`)
    // else axios.post('/api/v1/saved-offers', body: {member_id, id} )
    this.setState({ saved: !saved });
  };

  handleHover = () => this.setState({ hovered: 'offer-card--hovered' });

  render() {
    const { offer, hovered, statusLabel, statusDiv } = this.state;
    // eslint-disable-next-line react/prop-types
    const { hover, history } = this.props;
    return (
      <>
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
