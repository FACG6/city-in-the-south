import React, { Component } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';

import MemberInfo from './MemberInfo';
import SideProfile from './SideProfile';

import './style.css';

export default class Profile extends Component {
  state = {
    username: '',
    member: '',
  };

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      match: {
        params: { username },
      },
    } = this.props;
    this.setState({ username });
    fetch(`/api/v1/member/${username}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState({ member: res.data });
        }
      })
      .catch(() =>
        this.setState(
          {
            showAlert: true,
          },
          () =>
            setTimeout(() => {
              this.setState({ showAlert: false });
            }, 3000)
        )
      );
  }

  render() {
    const { username, member, showAlert } = this.state;
    return (
      <Container>
        {showAlert && <Alert>Somthing went error! Try again.</Alert>}
        {username && member && (
          <>
            <Row>
              <Col lg={3}>
                <SideProfile memberName={username} member={member} />
              </Col>
              <Col lg={9}>
                <MemberInfo
                  memberName={username}
                  memberId={member.id}
                  bio={member.bio}
                  fullName={member.full_name}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
    );
  }
}
