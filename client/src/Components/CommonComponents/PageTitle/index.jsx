import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function PageTitle(props) {
  const { title } = props;
  return <h3 className="pageTitle">{title}</h3>;
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
