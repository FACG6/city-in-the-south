import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './style.css';
import { withRouter } from 'react-router-dom';

class OfferCard extends React.Component {
  state = {
    offer: null,
    statusLabel: null,
    statusDiv: null,
    hovered: null,
    saved: false,
    savedOffers: null,
  };

  componentDidMount() {
    const { offer, status } = this.props;
    this.setState({ offer });
    switch (status) {
      case 'completed':
        this.setState({
          statusLabel: 'offer__card--completed',
          statusDiv: 'offer__card--green',
        });
        break;
      case 'in progress':
        this.setState({
          statusLabel: 'offer__card--inProgress',
          statusDiv: 'offer__card--orange',
        });
        break;
      case 'pending':
        this.setState({
          statusLabel: 'offer__card--pending',
          statusDiv: 'offer__card--blue',
        });
        break;
      default:
        this.setState({ statusLabel: 'offer__card--activeStatus' });
    }

    // request for give id's saved offers (by member_id 'from local storage')
    // response : array of saved id (e.g: data = [2,6,8,9])
    // this.setState({savedOffers: data})
  }

  savedClassStatus = () => {
    const { saved } = this.state;
    if (saved) return 'offer__card--saved savedOffer';
    return 'offer__card--saved unsavedOffer';
  };

  handleSave = id => {
    const { saved } = this.state;
    // send request to the backend to save (if this.state.saved === true) the offer
    // if this.state.saved is false, send request to unsave the offer
    // if(saved) axios.delete(`/api/v1/saved-offer/${id}`)
    // else axios.post('/api/v1/saved-offers', body: {member_id, id} )
    this.setState({ saved: !saved });
  };

  handleCheckSave = id => {
    const { savedOffers, saved } = this.state;
    if (savedOffers.includes(id)) this.setState({ saved: !saved });
  };

  render() {
    const { offer, hovered, statusLabel, statusDiv } = this.state;
    const { hover, history } = this.props;
    return (
      <>
        {offer ? (
          <Card className={`offer__card ${hovered}`} key={offer.id}>
            {hover ? <span className={statusDiv}> </span> : null}
            <Card.Header className="offer__card--header">
              <div>
                <span className="offer__card--position">{offer.position}</span>
                <br />
                <span className="offer__card--title">{offer.title}</span>
              </div>
              {hover ? () => this.setState({ hovered: 'card__hovered' }) : null}
              {hover ? (
                <span className={statusLabel}> {offer.status}</span>
              ) : null}
              <Button
                onClick={() => this.handleSave(offer.id)}
                className="card__save--btn"
              >
                <i className={`fas fa-bookmark ${this.savedClassStatus()}`}>
                  {' '}
                </i>
              </Button>
            </Card.Header>
            <Card.Body onClick={() => history.push(`/app/offers/${offer.id}`)}>
              <Card.Text className="card__description">
                {offer.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <>
            <span> loading... </span>
          </>
          )}
      </>
    );
  }
}

export default withRouter(OfferCard);
