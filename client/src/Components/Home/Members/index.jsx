import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';

import './style.css';

// eslint-disable-next-line react/prop-types
export default function Members({ filtered, history }) {
  return (
    <Row key={Math.random()}>
      {filtered[0] ? (
        filtered.map(member => {
          return (
            <Col xs={12} md={4} lg={4} key={member.id}>
              <Card
                className="member-card"
                key={member.id}
                onClick={() => history.push(`/app/profile/${member.username}`)}
              >
                <Card.Body>
                  <Row key={member.id}>
                    <Col xs={6} md={5}>
                      <Card.Img
                        src={
                          member.avatar
                            ? member.avatar
                            : 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
                        }
                        className="member-card__avatar"
                      />
                      <Card.Title className="member-card__username">
                        {member.username}
                      </Card.Title>
                    </Col>
                    {/* <Col
                      xs={6}
                      md={7}
                      className="member-card__username"
                      key={member.id}
                    >
                      <Card.Text>{member.username}</Card.Text>
                    </Col> */}
                  </Row>
                  <br />
                  <div>
                    Skills :
                    <div className="member-card__skills">
                      {member.skills.map(skill => (
                        <h1 className="member-card__skill" key={skill.id}>
                          {skill.name}
                        </h1>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <div className="main-spinner">There is no result</div>
      )}
    </Row>
  );
}

Members.defaultProps = {
  filtered: [],
};

Members.propTypes = {
  filtered: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
};
