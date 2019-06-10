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

import membetDetails from '../utils/members';
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
    offerType: [],
    filteredOffers: [],
  };

  componentDidMount() {
    if (filter.skills[0]) this.setState({ skills: filter.skills });
    // make a request to get the skills from the member_skill
    else this.setState({ skills: memberSkills });

    if (filter.offer_type[0]) this.setState({ offerType: filter.offer_type });

    this.setState({ offers: offersDetails });
    this.setState({ filteredOffers: offersDetails });
    this.setState({ filterQuery: localStorage.getItem('filterQuery') });
    this.setState({ members: membetDetails });
  }

  handleSkillOnChange = skills => {
    const { filterQuery, members, offers } = this.state;
    if (filterQuery === 'Members') {
      let memberArray = [];
      this.setState({ members: [] });
      memberArray = members.filter(
        member =>
          !skills.filter(
            skill =>
              !member.skill.filter(_skill => _skill.id === skill.id).length
          ).length
      );
      this.setState({ members: memberArray });
    }

    if (filterQuery === 'Offers') {
      let offerArray = [];
      this.setState({ filteredOffers: [] });
      offerArray = offers.filter(offer => {
        if (offer.status === 'active') {
          return !skills.filter(
            skill =>
              !offer.skill.filter(_skill => _skill.id === skill.id).length
          ).length;
        }
      });
      this.setState({ filteredOffers: offerArray });
    }
  };

  handleOfferTypeOnChange = offertype => {};

  render() {
    const {
      isClicked,
      filterQuery,
      members,
      skills,
      offerType,
      filteredOffers,
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
                data={offerType}
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
                  ? members.length
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
                      {filterQuery === 'Members' ? 'Members' : 'Offers'}{' '}
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
              <Members filtered={members} {...this.props} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}
