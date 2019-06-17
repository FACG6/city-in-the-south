import React from 'react';
import { Container, Alert } from 'react-bootstrap';

import ApplicationCard from '../CommonComponents/OfferCard';

import './style.css';

export default class MyApplications extends React.Component {
  state = {
    myApplications: [],
    message: '',
  };

  componentDidMount() {
    // fetch for myApplications data and store it in the state
    // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userInfo = { id: 1 };
    const { id } = userInfo;
    fetch(`/api/v1/${id}/my-applications`)
      .then(res => res.json())
      .then(({ data }) => {
        if (data) {
          this.setState({ myApplications: data });
        }
      })
      .catch(er => {
        this.setState({ message: er.message });
      });
  }

  render() {
    const { myApplications, message } = this.state;
    return (
      <>
        <Container className="page__container">
          <div className="my-applications__title">
            <span>My Applications</span>
          </div>
          {message && <Alert variant="danger">{message}</Alert>}
          {myApplications
            ? myApplications.map(item => {
                return (
                  <ApplicationCard
                    hover
                    offer={item}
                    key={item.id}
                    status={item.status}
                  />
                );
              })
            : null}
        </Container>
      </>
    );
  }
}
