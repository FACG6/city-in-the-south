import React from 'react';
import './style.css';
import { Button, Alert } from 'react-bootstrap';
import Slider from './Slider';

export default function LandingPage() {
  return (
    <>
      <div className="header">
        <h2 className="header-tweet">
          Want good (fair and meaningful) work or want to offer good work? Join
          us and find/show opportunities to connect and work together.
        </h2>
      </div>
      <div className="slider">
        <Button variant="flat" size="xxl">
          flat button
        </Button>
      </div>

      <div className="about">
        <Alert dismissible variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      </div>
      <Slider />
    </>
  );
}
