import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function PageTitle(props) {
  const { title } = props;
  return <h2>{title}</h2>;
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
