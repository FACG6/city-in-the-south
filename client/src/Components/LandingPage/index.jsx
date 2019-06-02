import React from 'react';

import './style.css';

import Slider from './Slider';

export default function LandingPage() {
  return (
    <>
      <section className="landing__header">
        <h2 className="landing__tweet">
          Want good (fair and meaningful) work or want to offer good work? Join
          us and find/show opportunities to connect and work together.
        </h2>
      </section>
      <h2 className="landing__title landing__title--center">Success stories</h2>
      <Slider />
      <section className="landing__aboutus">
        <div className="landing__info">
          <h2 className="landing__title">About us</h2>
          <p className="landing__paragraph">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur libero velit soluta voluptas neque, reiciendis ullam,
            quidem cupiditate sequi necessitatibus facilis perspiciatis quis
            saepe voluptatum totam est, maxime suscipit ducimus? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Debitis, excepturi
            rerum! Tempora suscipit debitis distinctio itaque sed deleniti,
            similique, officiis illo, quisquam tempore quos ullam eum ab dolorem
            est quibusdam.
          </p>
        </div>
        <div className="landing__img" />
      </section>
    </>
  );
}
