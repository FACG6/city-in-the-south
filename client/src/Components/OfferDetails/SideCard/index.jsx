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
                <li key={Math.random()} className="side-card__li">
                  <span> - </span>
                  {item.name}
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
