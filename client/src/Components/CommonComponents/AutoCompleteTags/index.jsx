import React, { Component } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { Typeahead } from 'react-bootstrap-typeahead';
import { skills, offerType } from './staticData';
import './style.css';

export default class AutoCompleteTags extends Component {
  state = {
    options: null,
  };

  componentDidMount() {
    // git the data form the back for skills and offer_type and setSatet for the skills and offer type
    // const selected = options.filter(item => _.find(fetched, id => id === item.id))

    const { type } = this.props;
    if (type === 'skill') {
      this.setState({ options: skills });
    }
    if (type === 'offer_type') {
      this.setState({ options: offerType });
    }
  }

  handleChange = items => {
    /* filter the skills if the user enter new skills we will make a request to the back to add the skills the user adding it 
    and the same as for the offer_type
  */
    items.map(item => {
      if (item.customOption) {
        // make a requset to the back to add new item
      }
    });
  };

  render() {
    const { options } = this.state;
    if (options) {
      return (
        <>
          <Typeahead
            multiple
            onChange={items => {
              this.handleChange(items);
            }}
            id={options.id}
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
