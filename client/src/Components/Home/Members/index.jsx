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
            <Col xs={12} md={4} lg={4} key={Math.random()}>
              <Card
                className="member-card"
                key={member.id}
                onClick={() => history.push(`/profile/${member.username}`)}
              >
                <Card.Body>
                  <Row>
                    <Col xs={6} md={5} key={member.id}>
                      <Card.Img
                        src={member.avatar}
                        className="member-card__avatar"
                      />
                    </Col>
                    <Col xs={6} md={7} className="member-card__username">
                      <Card.Text>{member.username}</Card.Text>
                    </Col>
                  </Row>
                  <br />
                  <div>
                    Skills :
                    <br />
                    <br />
                    <div className="member-card__skills">
                      {member.skill.map(skill => (
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
    })
  ),
};
