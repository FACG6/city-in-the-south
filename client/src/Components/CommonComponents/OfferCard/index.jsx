import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';
import { withRouter } from 'react-router-dom';

class OfferCard extends React.Component {
  state = {
    offer: null,
    statusLabel: null,
    statusDiv: null,
    hovered: null,
    saved: false,
  };

  componentDidMount() {
    const { offer, status } = this.props;
    this.setState({ offer });
    // console.log(999999, status);
    switch (status) {
      case 'completed':
        this.setState({
          statusLabel: 'offer__card--completed',
          statusDiv: 'offer__card--green',
        });
        console.log(1, status);
        break;
      case 'in progress':
        this.setState({
          statusLabel: 'offer__card--inProgress',
          statusDiv: 'offer__card--orange',
        });
        console.log(2, status);
        break;
      case 'pending':
        this.setState({
          statusLabel: 'offer__card--pending',
          statusDiv: 'offer__card--blue',
        });
        console.log(3, status);
        break;
      default:
        this.setState({ statusLabel: 'offer__card--activeStatus' });
    }
  }

  handleSave = id => {
    const { saved } = this.state;
    // send request to the backend to save (if this.state.saved === true) the offer
    // if this.state.saved is false, send request to unsave the offer
    // if(saved) axios.delete(`/api/v1/saved-offer/${id}`)
    // else axios.post('/api/v1/saved-offers', body: {member_id, id} )
    this.setState({ saved: !saved });
  };

  render() {
    const { offer, hovered, statusLabel, statusDiv, saved } = this.state;
    const { hover, history } = this.props;
    return (
      <>
        {offer ? (
          <Card className={`offer__card ${hovered}`} key={offer.id}>
            {hover ? <div className={statusDiv}> </div> : null}
            <div>
              <Card.Header className="offer__card--header">
                <div>
                  <span className="offer__card--position">
                    {offer.position}
                  </span>
                  <br />
                  <span className="offer__card--title">{offer.title}</span>
                </div>
                <div>
                  {hover
                    ? () => this.setState({ hovered: 'card__hovered' })
                    : null}
                  {hover ? (
                    <span className={statusLabel}> {offer.status}</span>
                  ) : null}
                  <i
                    className={`far fa-bookmark offer__card--saved {
                      saved ? 'savedOffer' : 'unsavedOffer'
                    }`}
                    onClick={() => this.handleSave(offer.id)}
                  >
                    {' '}
                  </i>
                </div>
              </Card.Header>
              <Card.Body
                onClick={() => history.push(`/app/offers/${offer.id}`)}
              >
                <Card.Text className="card__description">
                  {offer.description}
                </Card.Text>
              </Card.Body>
            </div>
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
