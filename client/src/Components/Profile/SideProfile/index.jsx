/* eslint-disable react/prop-types */
import React from 'react';

import './style.css';

export default function SideProfile({
  avatar,
  username,
  address,
  email,
  phone,
  skills,
}) {
  return (
    <>
      <img
        src={avatar}
        width="100%"
        alt={`${username} profile img`}
        className="profile__img"
      />
      <p className="profile__username">{username}</p>
      <h2 className="profile__title">
        CONTACT
        <hr className="profile__title__line" />
      </h2>
      <div className="profile__contactInfo">
        {address && <p>{address}</p>}
        {email && <p>Email: {email}</p>}
        {phone && <p>Phone: {phone}</p>}
      </div>
      <h2 className="profile__title">
        SKILLS
        <hr className="profile__title__line" />
      </h2>
      <div className="profile__skills">
        {skills[0] && skills.map(skill => <p> - {skill.name}</p>)}
      </div>
    </>
  );
}
