import React, { Component } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { Typeahead } from 'react-bootstrap-typeahead';
import { skills, offerType } from './staticData';
import './style.css';

export default class AutoCompleteTags extends Component {
  state = {
    options: null,
    offer_type: null,
  };

  componentDidMount() {
    // git the data form the back for skills and offer_type and setSatet for the skills and offer type
    // const selected = options.filter(item => _.find(fetched, id => id === item.id))

    const { type } = this.props;
    if (type === 'skill') {
      console.log(skills);
      this.setState({ options: skills });
    }
    if (type === 'offer_type') {
      this.setState({ options: offerType });
    }
  }

  handleChange = () => {
    /* filter the skills if the user enter new skills we will make a request to the back to add the skills the user adding it 
    and the same as for the offer_type
  */
    const { options } = this.state;
    console.log(options);
  };

  render() {
    const { options } = this.state;
    if (options) {
      return (
        <>
          <Typeahead
            multiple
            onChange={ss => console.log(1111111111, ss)}
            id="this"
            key="id"
            selected={options.id}
            valueKey="id"
            labelKey="name"
            options={options}
            allowNew
            newSelectionPrefix="Add a new item: "
            placeholder="Choose ..."
          />
        </>
      );
    }
    return <h1>loading</h1>;
  }
}
