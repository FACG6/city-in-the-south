import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
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
    const { type, allowNew } = this.props;
    this.setState({ allownew: allowNew });
    if (type === 'skill') {
      fetch('/api/v1/skills', { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          const { data } = this.props;
          if (res.data)
            this.setState({ options: res.data, selectedTags: data });
        })
        .catch(err => console.log(err));
    } else if (type === 'offer_type') {
      fetch('/api/v1/offer-type', { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          const { data } = this.props;
          if (res.data)
            this.setState({ options: res.data, selectedTags: data });
        })
        .catch(err => console.log(err));
    }
  }

  handleChange = items => {
    /* filter the skills if the user enter new skills we will make a request to the back to add the skills the user adding it 
    and the same as for the offer_type
  */
    const { onchange, type } = this.props;
    this.setState(
      prevState => {
        const newOptions = [...prevState.options];
        const newTags = [...prevState.selectedTags];
        if (items.length > newTags.length) {
          if (items[items.length - 1].customOption) {
            if (type === 'skill') {
              fetch('/api/v1/skills', {
                method: 'POST',
                body: JSON.stringify({ name: items[items.length - 1].name }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              })
                .then(res => res.json())
                .then(res => {
                  if (res.data) {
                    newOptions.push(res.data);
                    newTags.push(res.data);
                  }
                })
                .catch(err => console.log(err));
            }
            if (type === 'offer_type') {
              fetch('/api/v1/offer-type', {
                method: 'POST',
                body: JSON.stringify({ name: items[items.length - 1].name }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              })
                .then(res => res.json())
                .then(res => {
                  if (res.data) {
                    newOptions.push(res.data[0]);
                    newTags.push(res.data[0]);
                  }
                })
                .catch(err => console.log(err));
            }
          }

          return { options: newOptions, selectedTags: newTags };
        }
        return { selectedTags: items };
      },
      /* here we need another on change its comming from the filter it self */
      () => {
        const { selectedTags } = this.state;
        if (typeof onchange === 'function') onchange(selectedTags);
      }
    );
  };

  handleInputChange = item => {
    const { options } = this.state;
    const { allowNew } = this.props;
    if (!allowNew) return;
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
        <h1 className="autocomplete__title">
          {type === 'skill' ? 'Skills' : 'Offer Type'}
        </h1>
        {options[0] ? (
          <Typeahead
            clearButton
            multiple
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            id={`autoComplete${type}`}
            key="id"
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
  allowNew: false,
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
  allowNew: PropTypes.bool,
};
