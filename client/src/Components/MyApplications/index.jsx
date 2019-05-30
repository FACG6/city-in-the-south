import React from 'react';
import { Container } from 'react-bootstrap';
import ApplicationCard from '../CommonComponents/OfferCard';
import applications from '../utils/myApplications';
import './style.css';

export default function MyApplications() {
  return (
    <>
      <Container className="my-applications__container">
        <div className="my-applications__title">
          <span>My Applications</span>
        </div>
        {applications
          ? applications.map(item => {
              if (item.status !== 'active') {
                return (
                  <ApplicationCard
                    hover
                    offer={item}
                    key={item.id}
                    saved={item.saved}
                    status={item.status}
                  />
                );
              }
            })
          : null}
      </Container>
    </>
  );
}
