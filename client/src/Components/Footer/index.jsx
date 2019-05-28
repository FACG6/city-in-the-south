import React from 'react';
import './style.css';

export default function Footer() {
  return (
    <>
      <div className="footer--container">
        <span>© 2019 City Of The South, Inc.</span>
        <ul className="footer--icons">
          <a href="#">
            <i className="fab fa-twitter" />
          </a>
          <a href="#">
            {' '}
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#">
            <i className="fab fa-linkedin" />
          </a>
        </ul>
      </div>
    </>
  );
}
