import React from 'react';

import './style.css';

import Slider from './Slider';

export default function LandingPage() {
  return (
    <>
      <div className="landing__header">
        <h2 className="landing__tweet">
          Want good (fair and meaningful) work or want to offer good work? Join
          us and find/show opportunities to connect and work together.
        </h2>
      </div>
      <Slider />
    </>
  );
}
