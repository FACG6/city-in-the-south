import React from 'react';
import { Row } from 'react-bootstrap';

import Education from './Education';
import Experience from './Experience';
import Bio from './Bio';

export default function MemberInfo(props) {
  const { memberName, memberId, bio } = props;
  return (
    <>
      <Row>
        <Bio memberId={memberId} bio={bio} />
      </Row>
      <Row>
        <Education memberId={memberId} />
      </Row>
      <Row>
        <Experience memberId={memberId} />
      </Row>
    </>
  );
}
