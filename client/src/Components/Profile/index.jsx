import React, { Component } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';

import Education from './Education';
import Experience from './Experience';
import SideProfile from './SideProfile';

import './style.css';

export default class Profile extends Component {
  state = {
    id: 0,
    username: '',
    avatar: '',
    hover: false,
    email: null,
    phone: null,
    address: null,
    skills: [],
    fullname: '',
    bio: '',
    educations: [],
    experiences: [],
    errMSg: '',
    showAlert: false,
    variant: '',
  };

  componentDidMount() {
    const {
      // eslint-disable-next-line react/prop-types
      match: { params },
    } = this.props;
    const { id } = this.props;
    let userId = 0;
    fetch(`/api/v1/member/${params.username}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const {
            address,
            bio,
            email,
            full_name: fullName,
            phone,
            skills,
            username,
            avatar,
            id,
          } = res.data;
          this.setState({
            address,
            bio,
            email,
            fullname: fullName,
            phone,
            skills,
            username,
            avatar:
              avatar ||
              'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
            id,
          });
          userId = id;
        } else {
          throw new Error();
        }
      })
      .then(() => {
        fetch(`/api/v1/education/${userId}`, { method: 'GET' })
          .then(res => res.json())
          .then(res => {
            if (res.data) {
              this.setState({ educations: res.data });
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            this.setState(
              {
                errMSg: 'Something went wrong',
                showAlert: true,
                variant: 'danger',
              },
              () =>
                setTimeout(() => {
                  this.setState({ errMSg: '', showAlert: false });
                }, 3000)
            );
          });

        fetch(`/api/v1/experience/${userId}`, { method: 'GET' })
          .then(res => res.json())
          .then(res => {
            if (res.data) {
              this.setState({ experiences: res.data });
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            this.setState(
              {
                errMSg: 'Something went wrong',
                showAlert: true,
                variant: 'danger',
              },
              () =>
                setTimeout(() => {
                  this.setState({ errMSg: '', showAlert: false });
                }, 3000)
            );
          });
      })
      .catch(() =>
        this.setState(
          {
            errMSg: 'Something went wrong',
            showAlert: true,
            variant: 'danger',
          },
          () =>
            setTimeout(() => {
              this.setState({ errMSg: '', showAlert: false });
            }, 3000)
        )
      );
  }

  render() {
    const {
      avatar,
      username,
      email,
      phone,
      address,
      skills,
      fullname,
      bio,
      educations,
      experiences,
      hover,
      errMSg,
      showAlert,
      variant,
      id,
    } = this.state;
    return (
      <Container className="profile__contanier">
        <Row>
          <Col sm={12} lg={3} md={3}>
            <SideProfile
              key={`member-${id}`}
              username={username}
              address={address}
              email={email}
              phone={phone}
              skills={skills}
              avatar={avatar}
              hover={hover}
            />
          </Col>
          <Col sm={12} lg={1} md={1} />
          <Col sm={12} lg={8} md={9} className="profile__main">
            <h1 className="profile__fullname">{fullname}</h1>
            {/** **************** Bio **************** */}
            <br />
            <h2 className="profile__title">BIO</h2>
            <p className="profile__bio">{bio}</p>
            <br />
            <br />

            {/** **************** EDUCATION **************** */}
            <h2 className="profile__title">EDUCATION</h2>

            {educations[0]
              ? educations.map(education => (
                  <Education
                    key={`education-${education.id}`}
                    education={education}
                    hover={hover}
                  />
                ))
              : null}
            <hr className="profile__line" />
            <br />
            <br />

            {/** **************** EXPERIENCE **************** */}
            <h2 className="profile__title">EXPERIENCE</h2>
            {experiences[0]
              ? experiences.map(experience => (
                  <Experience
                    key={`experience-${experience.id}`}
                    experience={experience}
                    hover={hover}
                  />
                ))
              : null}
            <hr className="profile__line" />
          </Col>
        </Row>
        <Alert show={showAlert} key={1} variant={variant}>
          {errMSg}
        </Alert>
      </Container>
    );
  }
}
