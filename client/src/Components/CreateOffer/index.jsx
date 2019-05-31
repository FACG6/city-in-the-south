import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import axios from "axios";
import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import './style.css';

export default class CreateOffer extends Component {
  state = {
    data: {},
    // skills: null, // skills id's
    // offer_types: null  //offer_types id's
    // member_id: 2,
  };

  componentDidMount() {
    // const member_id = get member_id from local storage
    // this.setState({ member_id })
    // request for backend to get member skills (array of skills id's)
    // `GET` : `/api/v1/filter/:memberId`
    // response: { error: null, data: { skills: ['node.js', 'postgres', 'react.js'], offer_types: ['fixed_price', 'part_time']} }
    // const { skills, offer_types } = result.data;
    // this.setState({ skills, offer_types })
  }

  handleSubmit = () => {
    const { title, position, description, skills } = this.state;
    let { data } = this.state;
    data = {
      title,
      position,
      description,
    };

    // send request to the backend with body
    // axios
    // .post('/api/v1/offers', { data })

    // send request with new skills from memeber (which don't exist in autocomplete) to update filters table `PUT` : `/api/v1/filter/:memberId`
    // and the same for offer_types
    // body of the request { skills: this.state.skills , offer_types: this.state.offer_types}
  };

  handleTitle = title => this.setState({ title });

  handlePosition = position => this.setState({ position });

  handleDescription = description => this.setState({ description });

  // handleSkills = e => {
  // console.log(111111);
  // }

  render() {
    // console.log(333, this.state);
    const { skills } = this.state;
    return (
      <Container className="page__container newoffer__container">
        <h1 className="newoffer-head__title"> New Offer </h1>
        <Form>
          <div className="newoffer__content">
            <Row>
              <Col sm={12} md={12} lg={6}>
                <Form.Group>
                  <Form.Label className="newoffer__content--label">
                    {' '}
                    Title:{' '}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:  Small Shop seeks workers "
                    onChange={({ target }) => this.handleTitle(target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="newoffer__content--label">
                    {' '}
                    Position:{' '}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:   Marketing Manager"
                    onChange={({ target }) => this.handlePosition(target.value)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={12} lg={6} className="autocomplete-offer__type">
                <AutoCompleteTags
                  type="offer_type"
                  placeholder="eg:  fixed price"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="newoffer__content--label">
                    {' '}
                    Description:{' '}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    className="newoffer__content--description"
                    rows="3"
                    onChange={({ target }) =>
                      this.handleDescription(target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <AutoCompleteTags
                className="autocomplete-skills"
                type="skill"
                placeholder=" select skills"
                // onInputChange={e => this.handleSkills(e)}
                options={skills}
              />
            </Row>
            <div>
              <Row className="newoffer__content-btns">
                <Col sm={12} md={12} lg={1} className="newoffer__content-btn">
                  <Button
                    className="newoffer__content-btn--apply"
                    onClick={this.handleSubmit}
                  >
                    Apply
                  </Button>
                </Col>
                <Col sm={12} md={12} lg={1} className="newoffer__content-btn">
                  <Button className="newoffer__content-btn--cancel">
                    Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </Container>
    );
  }
}
