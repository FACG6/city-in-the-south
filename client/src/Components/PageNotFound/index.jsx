import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1 className="not-found">404</h1>
      <p className="oops">Oops! Something is wrong.</p>
      <Link to="/" className="go-back">
        Go back in the initial page, is better
      </Link>
    </div>
  );
}
