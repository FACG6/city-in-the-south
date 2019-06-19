import React, { Component } from 'react';
import { Dropdown, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './style.css';

const io = require('socket.io-client');

class Notification extends Component {
  // this notification will fetched from back-end socket
  state = {
    notification: {
      seen: [],
      unSeen: [],
    },
    message: '',
    showAlert: false,
  };

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { id: memberId } = userInfo;
    this.getNotifications(memberId);
    this.handleNewNotification(memberId);
  }

  getNotifications = memberId => {
    fetch(`/api/v1/notifications/${memberId}`, { method: 'GET' })
      .then(res => {
        if (res.status === 200) return res.json();
        return new Error('notification error');
      })
      .then(({ data }) => {
        if (data) {
          const seen = data.filter(item => item.seen === true);
          const unSeen = data.filter(item => item.seen === false);
          const notification = {
            seen,
            unSeen,
          };
          this.setState({ notification });
        }
      })
      .catch(() => {
        this.setState(
          {
            message: 'get Notifications Error',
            showAlert: true,
          },
          () =>
            setTimeout(() => {
              this.setState({ message: '', showAlert: false });
            }, 3000)
        );
      });
  };

  handleNewNotification = memberId => {
    this.socket = io(`/member-${memberId}`);
    const {
      notification: { seen, unSeen },
    } = this.state;
    this.socket.on('myOfferNotification', data => {
      if (data.seen) {
        this.setState({
          notification: { unSeen, seen: [...seen, data] },
        });
      } else {
        this.setState({
          notification: {
            seen,
            unSeen: [...unSeen, data],
          },
        });
      }
    });
  };

  handleChangeToSeen = event => {
    const { id } = event.target;
    const {
      notification: { seen },
    } = this.state;
    const {
      notification: { unSeen },
    } = this.state;
    // update notification database and change seen to true
    fetch(`/api/v1/notifications/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) return res.json();
        return new Error('notification error');
      })
      .then(res => {
        if (res) {
          const { data } = res;
          const newUnSeen = unSeen.filter(item => item.id !== data.id);
          const newSeen = [...seen, data];
          const notification = {
            seen: newSeen,
            unSeen: newUnSeen,
          };
          this.props.history.push(data.url);
          this.setState({ notification });
        }
      })
      .catch(() =>
        this.setState({ message: 'Something error with notifications' })
      );
  };

  handleLink = event => {
    const { id } = event.target;
    const {
      notification: { seen },
    } = this.state;
    const data = seen.filter(item => item.id == id);
    this.props.history.push(data[0].url);
  };

  render() {
    const {
      notification: { seen, unSeen },
    } = this.state;
    const { message, showAlert } = this.state;
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
                  id={item.id}
                  onClick={this.handleChangeToSeen}
                  key={unSeen.indexOf(item)}
                  eventKey={index}
                  className="dropdown__item dropdown_item-unseen"
                >
                  <p id={item.id} className="dropdown__item-title">
                    {item.title}
                  </p>
                  <p id={item.id}> {item.msg}</p>
                </Dropdown.Item>
              );
            })}
            {/* render seen notifications */}
            {seen.map((item, index) => {
              return (
                <Dropdown.Item
                  id={item.id}
                  onClick={this.handleLink}
                  eventKey={index}
                  key={seen.indexOf(item)}
                  className="dropdown__item dropdown_item-seen"
                >
                  <p id={item.id} className="dropdown__item-title">
                    {item.title}
                  </p>
                  <p id={item.id}>{item.msg}</p>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        {showAlert && (
          <Alert
            variant="danger"
            style={{
              zIndex: '10',
              position: 'absolute',
              left: '-50vw',
              width: '25vw',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {message}
          </Alert>
        )}
      </>
    );
  }
}

export default withRouter(Notification);
