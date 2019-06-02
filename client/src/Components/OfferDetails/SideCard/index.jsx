import React from 'react';
import PorpTypes from 'prop-types';

import './style.css';

const SideCard = props => {
  const { title, items } = props;
  return (
    <>
      <div className="side-card__title">
        <span>{title}</span>
      </div>
      <ul>
        {items
          ? items.map(item => {
              return (
                <li key={items.indexOf(item)} className="side-card__li">
                  <span> - </span>
                  {item}
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default SideCard;

SideCard.porpTypes = {
  title: PorpTypes.string.isRequired,
  items: PorpTypes.array.isRequired,
};
