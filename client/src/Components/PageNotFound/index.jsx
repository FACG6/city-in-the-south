import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1 className="number">404</h1>
      <p className="oops">Oops! Page Not Found ... !</p>
      <br />
      <Link to="/" className="go-back">
        Go back to Landing page
      </Link>
    </div>
  );
}
