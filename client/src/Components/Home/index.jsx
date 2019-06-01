import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
  Dropdown,
  Spinner,
} from 'react-bootstrap';
import AutoCompleteTags from '../CommonComponents/AutoCompleteTags';
import './style.css';
import OfferCard from '../CommonComponents/OfferCard';
import offersDetails from '../utils/offers';

export default class Home extends Component {
  state = {
    offset: 0,
    isClicked: false,
    offers: [],
    filteredOffers: [],
    isActive: '',
    filteredMembers: [],
  };

  // get the filter from the back and passing it into the AutoComplete Component with props name --data--
  // and here we need to get 100 records from the data to filtering it
  /* and we need to check if the length of filter data less than 10 we should make a request to the back to get more data 
  with offset +100 */

  componentDidMount() {
    this.setState({ offers: offersDetails });
    this.setState({ filteredOffers: offersDetails });
    this.setState({ isActive: 'Members' });
    this.setState({ offset: 100 });
  }

  handleSkillOnChange = () => {
    // here we make a filter and check the length for both the members and the offers
  };

  handleOfferTypeOnChange = () => {
    // here we make a filter and check the length for  the members
  };

  render() {
    const {
      isClicked,
      offers,
      filteredOffers,
      isActive,
      filteredMembers,
    } = this.state;
    return (
      <Container className="page__container">
        <Row>
          <Col className="home__filter" sm={12} lg={3} md={3}>
            {isActive === 'Offers' ? (
              <AutoCompleteTags type="offer_type" />
            ) : null}
            <br />
            <AutoCompleteTags type="skill" />
          </Col>
          <Col className="home__main" sm={12} lg={8} md={8}>
            <Row>
              <Col xs={7}>
                <InputGroup className="mb-2  home__search">
                  <InputGroup.Prepend>
                    <Button
                      variant="outline-secondary"
                      className="home-search-btn"
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
              <div>
                {' '}
                {filteredMembers[0] ? (
                  filteredMembers.map(item => {
                    if (item.status === 'active') {
                      // Members Card
                    }
                  })
                ) : (
                  <div className="main-spinner">
                    <Spinner animation="border" variant="info" />
                  </div>
                )}{' '}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
