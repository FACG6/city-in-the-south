import React from 'react';
import { Card } from 'react-bootstrap';
import './style.css';
import { withRouter } from 'react-router-dom';

class OfferCard extends React.Component {
  state = {
    offer: null,
    status: null,
    hovered: null,
  };

  componentDidMount() {
    // request for get all offers from backend (reponse: array of object as offerDetails)
    const { offer } = this.props;
    this.setState({ offer });
  }

  render() {
    const { offer, hovered } = this.state;
    const { hover } = this.props;
    return (
      <>
        {offer ? (
          <Card
            className={`offer__card ${hovered}`}
            key={offer[0].id}
            onClick={() => console.log('object')}
          >
            <Card.Header className="offer__card--header">
              <div>
                <span className="offer__card--position">
                  {offer[0].position}
                </span>
                <br />
                <span className="offer__card--title">{offer[0].title}</span>
              </div>
              <div>
                {hover
                  ? () => this.setState({ hovered: 'card__hovered' })
                  : null}
                {hover ? (
                  <span className="offer__card--status">
                    {' '}
                    {offer[0].status}
                  </span>
                ) : null}
                <i
                  className="far fa-bookmark offer__card--saved"
                  onClick={this.handleSave}
                />
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text className="card__description">
                {offer[0].description}
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
