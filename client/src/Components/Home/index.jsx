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

import { filterOfferTypes, filterSkills, searchLogic } from './heplers';

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
    filterData: [],
  };

  componentDidMount() {
    let skills = [];
    let offerTypes = [];
    let members = [];
    let offers = [];
    let filterData = [];

    skills = filter.skills[0] ? filter.skills : memberSkills;

    if (filter.offer_type[0]) offerTypes = filter.offer_type;
    const filterQuery =
      localStorage.getItem('filterQuery') ||
      localStorage.setItem('filterQuery', 'Offers');

    members = memberDetails;
    filterData = filterSkills(members, skills);

    offers = offersDetails;
    const filteredOffersSkills = filterSkills(offers, skills);
    const filtereOffersOfferTypes = filterOfferTypes(offers, offerTypes);

    filterData = filteredOffersSkills.filter(item => {
      return filtereOffersOfferTypes.filter(_item => item.id !== _item.id);
    });

    this.setState({
      offers,
      members,
      skills,
      offerTypes,
      filterData,
      filterQuery,
    });
  }

  handleSkillOnChange = skills => {
    let filterData = [];
    // make a patch request to the back that add new values to filter
    this.setState({ skills });
    const { filterQuery, members, offers, offerTypes } = this.state;
    if (filterQuery === 'Members') {
      this.setState({ filterData: filterSkills(members, skills) });
    }
    if (filterQuery === 'Offers') {
      const filteredOffersSkills = filterSkills(offers, skills);
      const filtereOffersOfferTypes = filterOfferTypes(offers, offerTypes);

      filterData = filteredOffersSkills.filter(item => {
        return filtereOffersOfferTypes.filter(_item => item.id !== _item.id);
      });
      this.setState({ filterData });
    }
  };

  handleOfferTypeOnChange = offerTypes => {
    let filterData = [];
    // make a patch request to the back that add new values to filter
    this.setState({ offerTypes });
    const { offers, skills } = this.state;
    const filteredOffersSkills = filterSkills(offers, skills);
    const filtereOffersOfferTypes = filterOfferTypes(offers, offerTypes);

    filterData = filteredOffersSkills.filter(item =>
      filtereOffersOfferTypes.filter(_item => item.id === _item.id)
    );
    this.setState({ filterData });
  };

  handelSearch = ({ target: { value } }) => {
    const { filterData } = this.state;
    const newArray = searchLogic(value, filterData);
    this.setState(() => {
      if (newArray[0]) return { filterData: newArray };
      return { filterData };
    });
  };

  render() {
    const { isClicked, skills, offerTypes, filterData } = this.state;
    // eslint-disable-next-line react/prop-types
    return (
      <>
        <Row className="home__contanier">
          <Col className="home__filter" sm={12} lg={3} md={3}>
            <AutoCompleteTags
              type="skill"
              data={skills}
              onchange={this.handleSkillOnChange}
              allowNew={false}
            />
            <br />
            {localStorage.getItem('filterQuery') === 'Offers' && (
              <AutoCompleteTags
                type="offer_type"
                data={offerTypes}
                onchange={this.handleOfferTypeOnChange}
                allowNew={false}
              />
            )}
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
                {localStorage.getItem('filterQuery') === 'Members'
                  ? filterData.length
                  : filterData.length}{' '}
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
