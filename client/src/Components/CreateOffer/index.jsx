import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import newOfferValidation from './validationSchema';
import PageTitle from '../CommonComponents/PageTitle';
import auth from '../../auth/auth';

import './style.css';

class CreateOffer extends Component {
  state = {
    title: '',
    position: '',
    description: '',
    skills: [],
    offerType: [],
    memberId: 0,
    errMsg: '',
    messageAlert: '',
    showAlert: false,
    variant: '',
  };

  componentDidMount() {
    this.setState({
      memberId: auth.getUserInfo() && auth.getUserInfo().id,
    });
  }

  handleSubmit = () => {
    const {
      title,
      position,
      description,
      offerType,
      skills,
      memberId,
    } = this.state;

    newOfferValidation
      .validate(
        { title, position, description, offerType, skills },
        { abortEarly: false }
      )
      .then(() => {
        this.setState({ errMsg: '' });
        fetch('/api/v1/offers', {
          method: 'POST',
          body: JSON.stringify({
            title,
            position,
            description,
            offerType,
            skills,
            memberId,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res.data) {
              this.setState(
                {
                  messageAlert: 'Added successfully ',
                  showAlert: true,
                  variant: 'success',
                },
                () =>
                  setTimeout(() => {
                    // eslint-disable-next-line react/prop-types
                    const { history } = this.props;
                    const offerId = res.data.id;
                    this.setState({ messageAlert: '', showAlert: false });
                    history.push(`/app/offers/${offerId}`);
                  }, 1000)
              );
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            this.setState(
              {
                messageAlert: 'Something went wrong',
                showAlert: true,
                variant: 'danger',
              },
              () =>
                setTimeout(() => {
                  this.setState({ messageAlert: '', showAlert: false });
                }, 3000)
            );
          });
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

  handleSkills = skills => this.setState({ skills });

  handleOfferTypes = offerType => this.setState({ offerType });

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value, errMsg: '' });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    const { errMsg, variant, showAlert, messageAlert } = this.state;
    return (
      <Container className="page__container">
        <PageTitle title="New Offer" />
        <Form>
          <Form.Group>
            <div className="newoffer__content">
              <Row>
                <Col sm={12} md={12} lg={8}>
                  <Form.Label className="newoffer__label">Title :</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="eg:  Small Shop seeks workers "
                    onChange={this.handleInput}
                  />
                  {errMsg.title && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />{' '}
                      {errMsg.title}
                    </div>
                  )}
                  <Form.Label className="newoffer__label newoffer__label-padding">
                    Position :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="position"
                    placeholder="eg:   Marketing Manager"
                    onChange={this.handleInput}
                  />
                  {errMsg.position && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />
                      {errMsg.position}
                    </div>
                  )}
                </Col>
                <Col sm={12} md={12} lg={4}>
                  <AutoCompleteTags
                    type="offer_type"
                    placeholder="eg: fixed price"
                    onchange={this.handleOfferTypes}
                    allowNew
                  />
                  {errMsg.offerType && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />
                      Offertype is required field
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="newoffer__label newoffer__label-padding">
                    Description :
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    className="newoffer__description"
                    rows="5"
                    onChange={this.handleInput}
                  />
                  {errMsg.description && (
                    <div className="newoffer__errMsg">
                      <i className="fas fa-exclamation newoffer__errMsg--icon" />
                      {errMsg.description}
                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={8}>
                  <AutoCompleteTags
                    type="skill"
                    placeholder="select skills"
                    onchange={this.handleSkills}
                    allowNew
                  />
                </Col>
              </Row>
              <div>
                <Button
                  className="newoffer__btn--apply"
                  onClick={this.handleSubmit}
                >
                  Create
                </Button>
                <Button
                  className="newoffer__btn--cancel"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
                <br />
                <Row>
                  <Alert show={showAlert} key={1} variant={variant}>
                    {messageAlert}
                  </Alert>
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
