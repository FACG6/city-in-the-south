import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

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
    const { userInfo, bio } = this.state;
    return (
      <>
        <Col>
          <h2 className="profile__title">BIO</h2>
          <p className="profile__bio">{bio}</p>
        </Col>
      </>
    );
  }
}
