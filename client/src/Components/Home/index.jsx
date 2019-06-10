import React, { Component } from 'react';
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Dropdown,
} from 'react-bootstrap';

import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import Offers from './Offers';
import Members from './Members';

import { filterData } from './heplers';

import memberDetails from '../utils/members';
import offersDetails from '../utils/offers.1';
import filter from '../utils/filter';
import memberSkills from '../utils/skills';

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
  };

  // if (filter.skills[0]) this.setState({ skills: filter.skills });
  // make a request to get the skills from the member_skill    /*this.setState({ skills: memberSkills });*/
  // this.setState({ offerType: filter.offer_type });

  componentDidMount() {
    let skills = [];
    let offerTypes;
    let members = [];
    let offers = [];
    let filterMembers = [];
    let filteredOffers = [];

    skills = filter.skills[0] ? filter.skills : memberSkills;

    if (filter.offer_type[0]) offerTypes = filter.offer_type;
    // const { filterQuery } = this.state;
    // this.setState({
    //   filterQuery: ,
    // });
    members = memberDetails;
    filterMembers = filterData(members, skills);

    offers = offersDetails;
    filteredOffers = filterData(offers, skills);

    this.setState(
      {
        offers,
        members,
        skills,
        offerTypes,
        filterMembers,
        filteredOffers,
      },
      () => {
        //   if (filterQuery === 'Members')
        //     this.setState({ filterMembers: filterData(members, skills) });
        //   if (filterQuery === 'Offers')
        //     this.setState({ filteredOffers: filterData(offers, skills) });
      }
    );
  }

  handleSkillOnChange = skills => {
    const { filterQuery, members, offers } = this.state;
    if (filterQuery === 'Members') {
      this.setState({ filterMembers: filterData(members, skills) });
    }
    if (filterQuery === 'Offers') {
      this.setState({ filteredOffers: filterData(offers, skills) });
    }
  };

  handleOfferTypeOnChange = offertype => {};

  render() {
    const {
      isClicked,
      filterQuery,
      skills,
      offerTypes,
      filteredOffers,
      filterMembers,
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
            {filterQuery === 'Offers' && (
              <AutoCompleteTags
                type="offer_type"
                data={offerTypes}
                onchange={this.handleOfferTypeOnChange}
              />
            )}
          </Col>
          <Col className="home__main" sm={12} lg={8} md={8}>
            <Row>
              <Col xs={7}>
                <InputGroup className="mb-2  home__search">
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
                {filterQuery === 'Members'
                  ? filterMembers.length
                  : filteredOffers.length}{' '}
                results
              </Col>
              <Col className="dropdown-toggled" xs={3}>
                {isClicked ? (
                  <Dropdown.Menu show className="dropdwon-list">
                    <Dropdown.Header
                      onClick={() => {
                        this.setState({
                          filterQuery: 'Offers',
                          isClicked: false,
                        });
                        localStorage.setItem('filterQuery', 'Offers');
                      }}
                    >
                      Offers
                    </Dropdown.Header>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => {
                        this.setState({
                          filterQuery: 'Members',
                          isClicked: false,
                        });
                        localStorage.setItem('filterQuery', 'Members');
                      }}
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
            {filterQuery === 'Offers' ? (
              <Offers filtered={filteredOffers} />
            ) : (
              <Members filtered={filterMembers} {...this.props} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}
