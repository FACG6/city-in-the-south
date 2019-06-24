import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './style.css';

import validationSchema from './validationSchema';

class CoverLetter extends Component {
  state = {
    proposal: '',
    errMsg: '',
    showSucessAlert: false,
    showWrongAlert: false,
  };

  handleOnChange = ({ target: { value } }) => {
    this.setState({ proposal: value, errMsg: '' });
  };

  handleApplyProposal = () => {
    // eslint-disable-next-line react/prop-types
    const { offerId, userInfo, history } = this.props;
    const { proposal } = this.state;
    validationSchema
      .validate({ proposal }, { abortEarly: false })
      .then(() => {
        this.setState({ errMsg: '' });
        const proposalDetails = {
          offer_id: offerId,
          member_id: userInfo.id,
          proposal,
        };
        fetch('/api/v1/applications', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(proposalDetails),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res.data) {
              this.setState(
                {
                  showSucessAlert: true,
                },
                () =>
                  setTimeout(() => {
                    this.setState({ showSucessAlert: false });
                    history.push('/app/my-applications');
                  }, 1000)
              );
            }
          })
          .catch(() =>
            this.setState(
              {
                showWrongAlert: true,
              },
              () =>
                setTimeout(() => {
                  this.setState({ showWrongAlert: false });
                }, 5000)
            )
          );
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

  render() {
    const { errMsg, showSucessAlert, showWrongAlert } = this.state;
    return (
      <>
        {showSucessAlert && <Alert variant="success">Sucess Apply</Alert>}
        {showWrongAlert && (
          <Alert variant="danger">Somthing went error! Try again.</Alert>
        )}
        <Row lg="9" className="offer-details__proposal-container">
          <Form.Control
            className="proposal"
            as="textarea"
            rows="8"
            placeholder="Write your proposal here !!!"
            style={{ marginBottom: '10px' }}
            onChange={this.handleOnChange}
          />
          <Button
            className="offer-details__proposal-container__button"
            onClick={this.handleApplyProposal}
          >
            Apply
          </Button>
        </Row>
        {errMsg.proposal && (
          <div className="newoffer__errMsg">
            <i className="fas fa-exclamation newoffer__errMsg--icon" />{' '}
            {errMsg.proposal}
          </div>
        )}
      </>
    );
  }
}

export default withRouter(CoverLetter);

CoverLetter.propTypes = {
  userInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  offerId: PropTypes.number.isRequired,
};
