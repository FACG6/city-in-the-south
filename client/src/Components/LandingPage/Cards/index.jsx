import React from 'react';
import PropTypes from 'prop-types';

import './style.css';
import { Row, Col } from 'react-bootstrap';

const renderCard = data =>
  data.map(({ id, imageUrl, fullName, profession, text }) => (
    <Row key={id} to="/" className="cards__card">
      <div className="cards__img">
        <img width="100%" src={imageUrl} alt={`${fullName} profile img`} />
      </div>
      <div>
        <h3 className="cards__title">{fullName}</h3>
        <h4 className="cards__sub-title">{profession}</h4>
        <p className="cards__desc">{text}</p>
      </div>
    </Row>
  ));

const Cards = ({ data }) => {
  return <section className="cards__container">{renderCard(data)}</section>;
};

Cards.defaultProps = { data: [] };

Cards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      fullName: PropTypes.string,
      profession: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default Cards;
