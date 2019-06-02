import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import axios from "axios";
import { withRouter } from 'react-router-dom';
import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import newOfferValidation from './validationSchema';
import './style.css';

class CreateOffer extends Component {
  state = {
    data: {},
    // skills: null, // skills id's
    // offer_types: null  //offer_types id's
    // member_id: 2,
    errMsg: '',
  };

  componentDidMount() {
    // const member_id = get member_id from local storage
    // this.setState({ member_id })
    // request for backend to get member skills and offer_types (array of skills and offer_types )
    // `GET` : `/api/v1/filter/:memberId`
    // response: { error: null, data: { skills: ['node.js', 'postgres', 'react.js'], offer_types: ['fixed_price', 'part_time']} }
    // const { skills, offer_types } = result.data;
    // this.setState({ skills, offer_types })
  }

  handleSubmit = () => {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    const { title, position, description } = this.state;
    let { data } = this.state;
    data = {
      title,
      position,
      description,
    };

    newOfferValidation
      .validate(data)
      .then(() => {
        // console.log(8989, data);
        this.setState({ errMsg: '' });
        // send request to the backend with body
        // axios
        // .post('/api/v1/offers', { data })
        // history.push('/home');
      })
      .catch(err => {
        const { errors = [] } = JSON.parse(JSON.stringify(err));
        // errors[0] ? console.log(errors[0]) : console.log(errors);
        // eslint-disable-next-line no-unused-expressions
        errors[0] ? this.setState({ errMsg: 'All fields are required' }) : '';
      });

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
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    const { errMsg } = this.state;
    return (
      <Container className="page__container newoffer__container">
        <h1 className="newoffer-head__title"> New Offer </h1>
        {errMsg ? (
          <div className="newoffer-errMsg">
            <i className="fas fa-exclamation newoffer-errMsg__icon" />{' '}
            <span className="newoffer-errMsg__text">{errMsg}</span>{' '}
          </div>
        ) : null}
        <Form>
          <Form.Group>
            <div className="newoffer__content">
              <Row>
                <Col sm={12} md={12} lg={6}>
                  <Form.Label className="newoffer__content--label">
                    {' '}
                    Title:{' '}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:  Small Shop seeks workers "
                    onChange={({ target }) => this.handleTitle(target.value)}
                    required
                  />

                  <Form.Label className="newoffer__content--label">
                    {' '}
                    Position:{' '}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg:   Marketing Manager"
                    onChange={({ target }) => this.handlePosition(target.value)}
                  />
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
                  />
                </Col>
              </Row>
              <Row>
                <Col>
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
                </Col>
              </Row>
              <Row>
                <AutoCompleteTags
                  className="autocomplete-skills"
                  type="skill"
                  placeholder=" select skills"
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
                    <Button
                      className="newoffer__content-btn--cancel"
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
