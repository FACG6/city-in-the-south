import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

export default class Bio extends Component {
  state = {
    userInfo: '',
    bio: '',
    memberId: '',
  };

  componentDidMount() {
    const { bio, memberId } = this.props;
    this.setState({ bio, memberId });
  }

  render() {
    const { bio } = this.state;
    return (
      <Row>
        <Col>
          <h2 className="profile__title">BIO</h2>
          <p className="profile__bio">{bio}</p>
        </Col>
      </Row>
    );
  }
}
