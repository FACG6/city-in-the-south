import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../../CommonComponents/OfferCard';

export default function Offers({ filtered }) {
  return (
    <div>
      {filtered[0] ? (
        filtered.map(item => {
          return (
            <OfferCard offer={item} key={`offers-${item.id}`} hover={false} />
          );
        })
      ) : (
        <div className="main-spinner"> There is no result</div>
      )}
    </div>
  );
}
Offers.defaultProps = {
  filtered: [],
};

Offers.propTypes = {
  filtered: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      position: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
