import React, { Component } from 'react';
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Dropdown,
  Alert,
} from 'react-bootstrap';

import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import Offers from './Offers';
import Members from './Members';

import { filterOfferTypes, filterSkills, searchLogic } from './heplers';

import './style.css';

export default class Home extends Component {
  state = {
    offset: 0,
    isClicked: false,
    offers: [],
    filterQuery: '',
    members: [],
    skills: [],
    offerTypes: [],
    filteredOffers: [],
    filterMembers: [],
    filterData: [],
    memberId:
      JSON.parse(localStorage.getItem('userInfo')) &&
      JSON.parse(localStorage.getItem('userInfo')).id,
    errMSg: '',
    showAlert: false,
    variant: '',
  };

  componentDidMount() {
    this.setState({
      filterQuery:
        localStorage.getItem('filterQuery') ||
        localStorage.setItem('filterQuery', 'Offers'),
    });

    const { offset, memberId } = this.state;
    fetch(`/api/v1/filter/${memberId}`)
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          const filterSkill = res.data.skills;
          const { offer_type: filterOfferType } = res.data;
          this.setState({
            skills: filterSkill[0] ? filterSkill : [],
            offerTypes: filterOfferType[0] ? filterOfferType : [],
          });
        } else {
          throw new Error();
        }
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

    fetch(`/api/v1/members/${offset}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState(
            { members: res.data },
            () => {
              const { members, skills } = this.state;
              if (skills[0] && members[0]) {
                const filterMembersData = filterSkills(members, skills);
                this.setState({ filterMembers: filterMembersData });
              } else {
                this.setState({ filterMembers: members });
              }
            },
            () => {
              const { filterMembers } = this.state;
              this.setState({ filterData: filterMembers });
            }
          );
        } else {
          throw new Error();
        }
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

    fetch(`/api/v1/offers/${offset}`, { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          this.setState(
            { offers: res.data },
            () => {
              const { offers, offerTypes, skills } = this.state;
              if (offers[0] && offerTypes[0]) {
                const filteredOffersSkills = filterSkills(offers, skills);
                const filtereOffersOfferTypes = filterOfferTypes(
                  offers,
                  offerTypes
                );
                const filteredOffersData = filteredOffersSkills.filter(item => {
                  return filtereOffersOfferTypes.filter(
                    _item => item.id !== _item.id
                  );
                });
                this.setState({ filteredOffers: filteredOffersData });
              } else {
                this.setState({ filteredOffers: offers });
              }
            },
            () => {
              const { filteredOffers } = this.state;
              this.setState({ filterData: filteredOffers });
            }
          );
        } else {
          throw new Error();
        }
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

  handleSkillOnChange = skills => {
    this.setState({ skills });
    const { filterQuery, members, offers, offerTypes, memberId } = this.state;
    if (filterQuery === 'Members') {
      const filterMembersData = filterSkills(members, skills);
      this.setState({ filterData: filterMembersData });
    }
    if (filterQuery === 'Offers') {
      const filteredOffersSkills = filterSkills(offers, skills);
      const filtereOffersOfferTypes = filterOfferTypes(offers, offerTypes);
      const filteredOffers = filteredOffersSkills.filter(item => {
        return filtereOffersOfferTypes.filter(_item => item.id !== _item.id);
      });
      this.setState({ filterData: filteredOffers });
    }
    fetch(`/api/v1/filter/${memberId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skills,
        offer_type: offerTypes,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (!res.data) throw new Error();
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
  };

  handleOfferTypeOnChange = offerTypes => {
    this.setState({ offerTypes });
    const { offers, skills, memberId } = this.state;
    const filteredOffersSkills = filterSkills(offers, skills);
    const filtereOffersOfferTypes = filterOfferTypes(offers, offerTypes);
    const filteredOffers = filteredOffersSkills.filter(item =>
      filtereOffersOfferTypes.filter(_item => item.id === _item.id)
    );
    this.setState({ filterData: filteredOffers });

    fetch(`/api/v1/filter/${memberId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        skills,
        offer_type: offerTypes,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (!res.data) throw new Error();
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
  };

  handelSearch = ({ target: { value } }) => {
    let filterData = [];
    const { filterMembers, filteredOffers, filterQuery } = this.state;
    filterData = filterQuery === 'Members' ? filterMembers : filteredOffers;
    const newArray = searchLogic(value, filterData);
    this.setState(() => {
      if (newArray) return { filterData: newArray };
      return { filterData };
    });
  };

  setFilterQueryToOffersOrMembers = e => {
    const { filteredOffers, filterMembers } = this.state;
    const type = e.target.textContent;
    this.setState({
      filterQuery: type,
      isClicked: false,
      filterData: type === 'Offers' ? filteredOffers : filterMembers,
    });
    localStorage.setItem('filterQuery', type);
  };

  render() {
    const {
      isClicked,
      skills,
      offerTypes,
      filterData,
      errMSg,
      showAlert,
      variant,
    } = this.state;
    // eslint-disable-next-line react/prop-types
    return (
      <>
        <Row className="home__contanier">
          <Col className="home__filter" sm={12} lg={3} md={3}>
            <AutoCompleteTags
              type="skill"
              data={skills}
              onchange={this.handleSkillOnChange}
            />
            <br />
            {localStorage.getItem('filterQuery') === 'Offers' && (
              <AutoCompleteTags
                type="offer_type"
                data={offerTypes}
                onchange={this.handleOfferTypeOnChange}
              />
            )}
            <br />
            <Alert show={showAlert} key={1} variant={variant}>
              {errMSg}
            </Alert>
          </Col>
          <Col className="home__main" sm={12} lg={8} md={8}>
            <Row>
              <Col xs={7}>
                <InputGroup
                  className="mb-2  home__search"
                  onChange={this.handelSearch}
                >
                  <InputGroup.Prepend>
                    <Button
                      variant="outline-secondary"
                      className="home__search-btn"
                    >
                      <i className="fas fa-search home__search-icon" />
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl aria-describedby="basic-addon1" />
                </InputGroup>
              </Col>
              <Col className="home__result-label" xs={2}>
                {filterData.length} results
              </Col>
              <Col className="dropdown-toggled" xs={3}>
                {isClicked ? (
                  <Dropdown.Menu show className="dropdwon-list">
                    <Dropdown.Header
                      onClick={this.setFilterQueryToOffersOrMembers}
                    >
                      Offers
                    </Dropdown.Header>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={this.setFilterQueryToOffersOrMembers}
                    >
                      Members
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <button
                    type="button"
                    className="dropdown-label dropdown-btn"
                    onClick={() => this.setState({ isClicked: true })}
                  >
                    <span className="dropdown-label">
                      {localStorage.getItem('filterQuery') === 'Members'
                        ? 'Members'
                        : 'Offers'}{' '}
                    </span>
                    <i className="fa fa-angle-down" />
                  </button>
                )}
              </Col>
            </Row>
            <hr className="hr-line" />
            {localStorage.getItem('filterQuery') === 'Offers' ? (
              <Offers filtered={filterData} />
            ) : (
              <Members filtered={filterData} {...this.props} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}
