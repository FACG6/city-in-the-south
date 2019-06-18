import React from 'react';
import PorpTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import './style.css';

export default function SideCard(props) {
  const { title, items } = props;
  return (
    <Row className="side-card">
      <Col>
        <div className="side-card__title">
          <span>{title}</span>
        </div>
        <ul>
          {items &&
            items.map(item => {
              return (
                <li key={Math.random()} className="side-card__li">
                  <span> - </span>
                  {item.name}
                </li>
              );
            })}
        </ul>
      </Col>
    </Row>
  );
}

SideCard.porpTypes = {
  title: PorpTypes.string.isRequired,
  items: PorpTypes.array.isRequired,
};
