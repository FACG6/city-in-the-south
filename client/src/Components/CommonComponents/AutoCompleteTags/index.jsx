import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Alert } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './style.css';

export default class AutoCompleteTags extends Component {
  state = {
    options: [],
    selectedTags: [],
    allownew: true,
    errMSg: '',
    showAlert: false,
    variant: '',
  };

  componentDidMount() {
    const { type, allowNew } = this.props;
    this.setState({ allownew: allowNew });
    if (type === 'skill') {
      fetch('/api/v1/skills', { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          if (res.data) this.setState({ options: res.data });
          if (res.error) {
            throw new Error();
          }
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
    } else if (type === 'offer_type') {
      fetch('/api/v1/offer-type', { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          if (res.data) this.setState({ options: res.data });
          if (res.error) {
            throw new Error();
          }
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
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (prevProps.data !== data) {
      this.setState({ selectedTags: data });
    }
  }

  handleChange = items => {
    const { onchange, type } = this.props;
    const { selectedTags, options } = this.state;
    if (items.length > selectedTags.length) {
      if (items[items.length - 1].customOption) {
        const newTags = [...selectedTags];
        const newOptions = [...options];
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
                this.setState({ options: newOptions, selectedTags: newTags });
                this.setState(
                  {
                    errMSg: 'Added successfully ',
                    showAlert: true,
                    variant: 'success',
                  },
                  () =>
                    setTimeout(() => {
                      this.setState({ errMSg: '', showAlert: false });
                    }, 1000)
                );
              }
              if (res.error) {
                throw new Error();
              }
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
                this.setState({ options: newOptions, selectedTags: newTags });
                this.setState(
                  {
                    errMSg: 'Added successfully ',
                    showAlert: true,
                    variant: 'success',
                  },
                  () =>
                    setTimeout(() => {
                      this.setState({ errMSg: '', showAlert: false });
                    }, 1000)
                );
              }
              if (res.error) {
                throw new Error();
              }
            })
            .catch(() => {
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
            });
        }
      } else {
        this.setState({ selectedTags: items });
      }
    } else {
      this.setState({ selectedTags: items });
    }
    if (typeof onchange === 'function') onchange(items);
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
    const {
      options,
      selectedTags,
      allownew,
      errMSg,
      showAlert,
      variant,
    } = this.state;
    const { placeholder, type } = this.props;
    return (
      <>
        <h1 className="autocomplete__title">
          {type === 'skill' ? 'Skills' : 'Offer Type'}
        </h1>

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
        <br />

        <Alert show={showAlert} key={1} variant={variant}>
          {errMSg}
        </Alert>
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
