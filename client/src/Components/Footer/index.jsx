import React from 'react';
import './style.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <span>© 2019 City Of The South, Inc.</span>
        <ul className="footer__icons">
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
    </footer>
  );
}
