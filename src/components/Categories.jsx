import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const { category } = this.props;
    return (
      <div>
        <label data-testid="category" htmlFor={ `category${category.id}` }>
          { category.name }
          <input type="radio" name="category" id={ `category${category.id}` } />
        </label>
      </div>
    );
  }
}

Categories.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
