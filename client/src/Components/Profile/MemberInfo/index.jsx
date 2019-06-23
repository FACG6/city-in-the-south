import React from 'react';
import { Row, Container } from 'react-bootstrap';

import Education from './Education';
import Experience from './Experience';
import Bio from './Bio';

export default function MemberInfo(props) {
  const { memberName, memberId, bio, fullName } = props;
  return (
    <>
      <Container className="profile__page">
        <Row>
          <h3>{fullName}</h3>
        </Row>
        <Row>
          <Bio memberId={memberId} bio={bio} />
        </Row>
        <Row>
          <Education memberId={memberId} />
        </Row>
        <Row>
          <Experience memberId={memberId} />
        </Row>
      </Container>
    </>
  );
}
