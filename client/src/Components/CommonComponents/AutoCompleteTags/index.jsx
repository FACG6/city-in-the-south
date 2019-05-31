import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { skills, offerType } from './staticData';

import './style.css';

export default class AutoCompleteTags extends Component {
  state = {
    options: [],
    selectedTags: [],
    allownew: true,
  };

  componentDidMount() {
    // git the data form the back for skills and offer_type and setSatet for the skills and offer type
    // const selected = options.filter(item => _.find(fetched, id => id === item.id))
    const { data, type } = this.props;
    this.setState({ selectedTags: data });

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
    const { onchange } = this.props;
    this.setState(prevState => {
      const newOptions = [...prevState.options];
      const newTags = [...prevState.selectedTags];
      if (items.length > newTags.length) {
        if (items[items.length - 1].customOption) {
          // send request to db to add skills/offertypes then return newOptions
          // push the newOptions
          newOptions.push({ id: 222, name: items[items.length - 1].name });
          newTags.push({ id: 222, name: items[items.length - 1].name });
        } else {
          newTags.push(items[items.length - 1]);
        }
        return { options: newOptions, selectedTags: newTags };
      }
      return { selectedTags: items };
    });
    /* here we need another on change its comming from the filter it self */
    if (typeof onchange === 'function') onchange();
  };

  handleInputChange = item => {
    const { options } = this.state;
    options.filter(option => {
      if (option.name.toLowerCase() === item.toLowerCase().trim())
        return this.setState({ allownew: false });
      return this.setState({ allownew: true });
    });
  };

  render() {
    const { options, selectedTags, allownew } = this.state;
    const { placeholder, type } = this.props;
    return (
      <>
        <h1 className="autocomplete-title">
          {type === 'skill' ? 'Skills ' : 'Offer Type'}
        </h1>
        {options[0] ? (
          <Typeahead
            clearButton
            multiple
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            id={`autoComplete${type}`}
            key="id"
            // defaultSelected={selectedTags}
            selected={selectedTags}
            valueKey="id"
            labelKey="name"
            options={options}
            allowNew={allownew}
            newSelectionPrefix="Add a new item: "
            placeholder={placeholder}
            className="autComplete-dev"
          />
        ) : (
          <Spinner animation="border" variant="info" />
        )}
      </>
    );
  }
}

AutoCompleteTags.defaultProps = {
  type: null,
  data: [],
  placeholder: '',
  onchange: null,
};

AutoCompleteTags.propTypes = {
  type: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  placeholder: PropTypes.string,
  onchange: PropTypes.func,
};
