import React from 'react';
import { Container } from 'react-bootstrap';

import ApplicationCard from '../CommonComponents/OfferCard';
import myApplicationsData from '../utils/myApplications';

import './style.css';

export default class MyApplications extends React.Component {
  state = {
    myApplications: [],
  };

  componentDidMount() {
    // fetch for myApplications data and store it in the state
    this.setState({ myApplications: myApplicationsData });
  }

  render() {
    const { myApplications } = this.state;
    return (
      <>
        <Container className="page__container">
          <div className="my-applications__title">
            <span>My Applications</span>
          </div>
          {myApplications
            ? myApplications.map(item => {
                return (
                  <ApplicationCard
                    hover
                    offer={item}
                    key={item.id}
                    saved={item.saved}
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
