import React, { Component } from 'react';
import {
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Dropdown,
  Spinner,
  Card,
} from 'react-bootstrap';

import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import OfferCard from '../CommonComponents/OfferCard';

import membetDetails from '../utils/members';
import offersDetails from '../utils/offers';
import filter from '../utils/filter';
import memberSkills from '../utils/skills';

import './style.css';

export default class Home extends Component {
  state = {
    offset: 0,
    isClicked: false,
    offers: [],
    filteredOffers: [],
    isActive: '',
    filteredMembers: [],
    skills: [],
    offerType: [],
    members: [],
  };

  // get the filter from the back and passing it into the AutoComplete Component with props name --data--
  // and here we need to get 100 records from the data to filtering it
  /* and we need to check if the length of filter data less than 10 we should make a request to the back to get more data 
  with offset +100 */

  componentDidMount() {
    if (filter.skills[0]) this.setState({ skills: filter.skills });
    // make a request to get the skills from the member_skill
    else this.setState({ skills: memberSkills });

    if (filter.offer_type[0]) this.setState({ offerType: filter.offer_type });

    this.setState({ offers: offersDetails });
    this.setState({ filteredOffers: offersDetails });
    this.setState({ isActive: 'Offers' });
    this.setState({ offset: 100 });
    this.setState({ filteredMembers: membetDetails });
    this.setState({ members: membetDetails });
  }

  handleSkillOnChange = skills => {
    // here we make a filter and check the length for both the members and the offers
    // make a request to the filter with patch
    console.log(111111111, skills);
    const { isActive, members } = this.state;
    let newfilteredMember;
    this.setState({ filteredMembers: [] });
    if (isActive === 'Members') {
      console.log(newfilteredMember);
      newfilteredMember = [];
      newfilteredMember.length = 0;
      members.filter(member => {
        member.skill.filter(memberSkill => {
          skills.filter(skill => {
            if (memberSkill.name === skill.name) {
              console.log(newfilteredMember);
              newfilteredMember.push(member);
              newfilteredMember.filter(newfilter => {
                // if (newfilter.id !== member.id)
              });
            }
          });
        });
        skills.filter(skill => console.log(skill));
        this.setState({ filteredMembers: newfilteredMember });
      });

      //   // console.log(skills);
      //   // console.log(members);
      // }
      // if (isActive === 'Members') {
      //   members.filter(member => {
      //     console.log(member);
      //     skills.map(memberskill => {
      //       console.log(memberskill);
      //       if (member.skills.name === memberskill.name) {
      //         this.setState({ filteredMembers: member });
      //       }
      //     });
      //   });
      // }
    }
  };

  handleOfferTypeOnChange = offertype => {
    // here we make a filter and check the length for  the members
    // make a request to the filter with patch
    console.log('offertype', offertype);
  };

  render() {
    const {
      isClicked,
      offers,
      filteredOffers,
      isActive,
      filteredMembers,
      skills,
      offerType,
    } = this.state;
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
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
            {isActive === 'Offers' && (
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
                {isActive === 'Members'
                  ? filteredMembers.length
                  : filteredOffers.length}{' '}
                results
              </Col>
              <Col className="dropdown-toggled" xs={3}>
                {isClicked ? (
                  <Dropdown.Menu show className="dropdwon-list">
                    <Dropdown.Header
                      onClick={() => {
                        this.setState({ isActive: 'Offers', isClicked: false });
                      }}
                    >
                      Offers
                    </Dropdown.Header>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() =>
                        this.setState({ isActive: 'Members', isClicked: false })
                      }
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
                      {isActive === 'Members' ? 'Members' : 'Offers'}{' '}
                    </span>
                    <i className="fa fa-angle-down" />
                  </button>
                )}
              </Col>
            </Row>
            <hr className="hr-line" />

            {isActive === 'Offers' ? (
              <div>
                {offers[0] ? (
                  offers.map(item => {
                    if (item.status === 'active') {
                      return (
                        <OfferCard offer={item} key={item.id} hover={false} />
                      );
                    }
                  })
                ) : (
                  <div className="main-spinner">
                    {' '}
                    <Spinner animation="border" variant="info" />
                  </div>
                )}{' '}
              </div>
            ) : (
              <Row>
                {filteredMembers[0] ? (
                  filteredMembers.map(member => {
                    return (
                      <Col xs={12} md={4} lg={4} key={member.id}>
                        <Card
                          className="member-card"
                          key={member.id}
                          onClick={() =>
                            history.push(`/profile/${member.username}`)
                          }
                        >
                          <Card.Body>
                            <Row>
                              <Col xs={6} md={5}>
                                <Card.Img
                                  src={member.avatar}
                                  className="member-card__avatar"
                                />
                              </Col>
                              <Col
                                xs={6}
                                md={7}
                                className="member-card__username"
                              >
                                <Card.Text>{member.username}</Card.Text>
                              </Col>
                            </Row>
                            <br />
                            <div>
                              Skills :
                              <br />
                              <br />
                              {member.skill[0] && (
                                <>
                                  {member.skill[0] && (
                                    <span className="member-card__skill">
                                      {member.skill[0].name}
                                    </span>
                                  )}
                                  {member.skill[1] && (
                                    <span className="member-card__skill">
                                      {member.skill[1].name}
                                    </span>
                                  )}
                                  {member.skill[2] && (
                                    <span className="member-card__skill">
                                      {member.skill[2].name}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <div className="main-spinner">
                    <Spinner animation="border" variant="info" />
                  </div>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </>
    );
  }
}
