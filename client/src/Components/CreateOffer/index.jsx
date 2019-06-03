import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import newOfferValidation from './validationSchema';

import './style.css';

class CreateOffer extends Component {
  state = {
    title: '',
    position: '',
    description: '',
    skills: null, // skills id's
    offerType: null, // offer_types id's
    // member_id: '',
    errMsg: '',
  };

  componentDidMount() {
    // const member_id = get member_id from local storage
    // this.setState({ member_id })
  }

  handleSubmit = () => {
    // eslint-disable-next-line react/prop-types
    // const { history } = this.props;
    const { title, position, description, offerType } = this.state;

    newOfferValidation
      .validate(
        { title, position, description, offerType },
        { abortEarly: false }
      )
      .then(() => {
        this.setState({ errMsg: '' });
        // send request to the backend with body
        // axios
        // .post('/api/v1/offers', { title, position, description, skills, offerType })
        // get offer_id from response
        // history.push(`/app/${offer_id}`);
        // send request with new skills from memeber (which don't exist in autocomplete) to update filters table `PUT` : `/api/v1/filter/:memberId`
        // and the same for offerTypes
        // body of the request { skills: this.state.skills , offerTypes: this.state.offerTypes}
      })
      .catch(({ inner }) => {
        if (inner) {
          const errors = inner.reduce(
            (acc, item) => ({ ...acc, [item.path]: item.message }),
            {}
          );
          this.setState({ errMsg: { ...errors } });
        }
      });
  };

  handleTitle = title => this.setState({ title });

  handlePosition = position => this.setState({ position });

  handleDescription = description => this.setState({ description });

  handleSkills = skills => this.setState({ skills });

  handleOfferTypes = offerType => this.setState({ offerType });

  render() {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    const { errMsg } = this.state;
    return (
      <Container className="page__container newoffer__container">
        <h1 className="newoffer__title"> New Offer </h1>
        <Form>
          <Form.Group>
            <div className="newoffer__content">
              <Row>
                <Col sm={12} md={12} lg={6}>
                  <Form.Label className="newoffer__label"> Title: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:  Small Shop seeks workers "
                    onChange={({ target }) => this.handleTitle(target.value)}
                  />
                  {errMsg.title && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />{' '}
                      {errMsg.title}
                    </div>
                  )}
                  <Form.Label className="newoffer__label">
                    {' '}
                    Position:{' '}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:   Marketing Manager"
                    onChange={({ target }) => this.handlePosition(target.value)}
                    name="position"
                  />
                  {errMsg.position && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />{' '}
                      {errMsg.position}
                    </div>
                  )}
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={6}
                  className="autocomplete-offer__type"
                >
                  <AutoCompleteTags
                    type="offer_type"
                    placeholder="eg:  fixed price"
                    onchange={this.handleOfferTypes}
                  />
                  {errMsg.offerType && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />{' '}
                      Offertype is required field
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="newoffer__label">
                    {' '}
                    Description:{' '}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    className="newoffer--description"
                    rows="3"
                    onChange={({ target }) =>
                      this.handleDescription(target.value)
                    }
                  />
                  {errMsg.description && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />{' '}
                      {errMsg.description}
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <AutoCompleteTags
                  className="autocomplete-skills"
                  type="skill"
                  placeholder=" select skills"
                  onchange={this.handleSkills}
                />
              </Row>
              <div>
                <Row className="newoffer__btns">
                  <Col sm={12} md={12} lg={1} className="newoffer--btn">
                    <Button
                      className="newoffer-btn--apply"
                      onClick={this.handleSubmit}
                    >
                      Create
                    </Button>
                  </Col>
                  <Col sm={12} md={12} lg={1} className="newoffer--btn">
                    <Button
                      className="newoffer-btn--cancel"
                      onClick={() => history.push('/home')}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default withRouter(CreateOffer);
