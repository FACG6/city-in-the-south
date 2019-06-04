import React from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../../CommonComponents/OfferCard';

export default function Offers({ filtered }) {
  return (
    <div>
      {filtered[0] ? (
        filtered.map(item => {
          if (item.status === 'active') {
            return <OfferCard offer={item} key={item.id} hover={false} />;
          }
        })
      ) : (
        <div className="main-spinner"> There is no result</div>
      )}
    </div>
  );
}

Offers.propTypes = {
  filtered: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      ...PropTypes.string,
    })
  ).isRequired,
};
