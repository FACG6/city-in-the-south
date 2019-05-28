import React, { Component } from "react";
import { Card, Image } from "react-bootstrap";

export default class Cards extends Component {
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Image src="https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg" roundedCircle />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link href="#">Card Link</Card.Link>
        </Card.Body>
      </Card>
    );
  }
}
