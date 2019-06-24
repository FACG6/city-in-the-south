import React from 'react';
import { Row, Container } from 'react-bootstrap';

import Education from './Education';
import Experience from './Experience';
import Bio from './Bio';

import './style.css';

export default function MemberInfo(props) {
  const { memberId, bio, fullName } = props;
  return (
    <div className='profile__page'>
      <h3 className='fullname'>{fullName}</h3>
      <Bio memberId={memberId} bio={bio} />
      <hr />
      <Education memberId={memberId} />
      <hr />
      <Experience memberId={memberId} />
    </div>
  );
}
