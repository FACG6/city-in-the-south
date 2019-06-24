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

import {
  getfilteredMembers,
  getfilteredOffers,
  filterSkillsOfferType,
  searchLogic,
} from './heplers';

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
      (JSON.parse(localStorage.getItem('userInfo')) &&
        JSON.parse(localStorage.getItem('userInfo')).id) ||
      'guest',
    errMSg: '',
    showAlert: false,
    variant: '',
  };

  componentDidMount() {
    const filterQuery =
      localStorage.getItem('filterQuery') ||
      localStorage.setItem('filterQuery', 'Offers');

    const { offset, memberId } = this.state;
    fetch(`/api/v1/filter/${memberId}`)
      .then(res => res.json())
      .then(res => {
        let offerTypes;
        let skills;

        if (!res.data.skills) {
          const {
            offerTypes: stateOfferTypes,
            skills: stateSkills,
          } = this.state;

          offerTypes = stateOfferTypes;
          skills = stateSkills;

          fetch('/api/v1/filter', {
            method: 'POST',
            body: JSON.stringify({ memberId, skills: [], offerTypes: [] }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(result => result.json())
            .then(result => {
              if (result.data) {
                this.setState(
                  {
                    errMSg: 'added successfully',
                    showAlert: true,
                    variant: 'success',
                  },
                  () =>
                    setTimeout(() => {
                      this.setState({ errMSg: '', showAlert: false });
                    }, 100)
                );
              }
            });
        }
        if (res.data.skills) {
          const {
            offer_type: filterOfferTypes,
            skills: filterSkills,
          } = res.data;

          offerTypes = filterOfferTypes;
          skills = filterSkills;
        }

        getfilteredMembers(
          skills,
          offset,
          (err, { members, filterMembers }) => {
            if (err) {
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
            } else {
              getfilteredOffers(
                skills,
                offerTypes,
                offset,
                (error, { offers, filteredOffers }) => {
                  if (error) {
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
                  } else {
                    const filterData =
                      filterQuery === 'Members'
                        ? filterMembers
                        : filteredOffers;
                    this.setState({
                      offers,
                      members,
                      filterMembers,
                      filteredOffers,
                      filterData,
                      skills,
                      offerTypes,
                      filterQuery,
                    });
                  }
                }
              );
            }
          }
        );
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
    const { filterQuery, members, offers, offerTypes, memberId } = this.state;
    if (filterQuery === 'Members') {
      const filterData = filterSkillsOfferType(members, skills, []);
      this.setState({ filterData, skills });
    }
    if (filterQuery === 'Offers') {
      const filterData = filterSkillsOfferType(offers, skills, offerTypes);
      this.setState({ filterData, skills });
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
    const { offers, skills, memberId } = this.state;
    const filterData = filterSkillsOfferType(offers, skills, offerTypes);
    this.setState({ filterData, offerTypes });

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
