import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import './style.css';

class Notification extends Component {
  // this notification will fetched from back-end socket
  state = {
    notification: {
      seen: [
        {
          title: 'hi',
          message: 'hi there!!!',
        },
      ],
      unSeen: [
        {
          title: 'Welcome',
          message: 'Welcome to my app',
        },
        {
          title: 'need your attension',
          message: 'we make a servey about customer opinions and suggestion',
        },
      ],
    },
  };

  render() {
    const {
      notification: { seen, unSeen },
    } = this.state;
    const status = unSeen.length > 0;

    return (
      <>
        <Dropdown alignRight>
          <Dropdown.Toggle id="dropdown-basic" className="nav__dropdown">
            {status ? (
              <i className="fas fa-bell fa-lg">
                <span className="notification-no">{unSeen.length}</span>
              </i>
            ) : (
              <i className="far fa-bell fa-lg" />
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown__menu">
            {/* render un seen notifications */}
            {unSeen.map((item, index) => {
              return (
                <Dropdown.Item
                  key={unSeen.indexOf(item)}
                  eventKey={index}
                  className="dropdown__item dropdown_item-unseen"
                >
                  <p className="dropdown__item-title">{item.title}</p>
                  <p>{item.message}</p>
                </Dropdown.Item>
              );
            })}
            {/* render seen notifications */}
            {seen.map((item, index) => {
              return (
                <Dropdown.Item
                  key={seen.indexOf(item)}
                  eventKey={index}
                  className="dropdown__item dropdown_item-seen"
                >
                  <p className="dropdown__item-title">{item.title}</p>
                  <p>{item.message}</p>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}

export default Notification;
