import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const { category, onInputChange } = this.props;
    return (
      <div>
        <label data-testid="category" htmlFor={ category.id }>
          { category.name }
          <input
            type="radio"
            name="category"
            id={ category.id }
            onChange={ onInputChange }
          />
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
  onInputChange: PropTypes.func.isRequired,
};
