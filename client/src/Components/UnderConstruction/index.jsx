import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function UnderConstruction() {
  return (
    <div className="underConstruction__container">
      <div>
        <i className="fas fa-tools underConstruction__container--icon"> </i>
      </div>
      <div className="underConstruction__container--content">
        <h1>
          Under{' '}
          <span className="underConstruction__container--span">
            Construction
          </span>{' '}
          Page
        </h1>
        <h2>
          Go to{' '}
          <Link to="/" className="underConstruction__container--link">
            {' '}
            home{' '}
          </Link>
        </h2>
      </div>
    </div>
  );
}
