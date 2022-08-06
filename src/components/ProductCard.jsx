import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {products.length > 0 ? (
          products.map(({ title, price, thumbnail, id }) => (
            <div key={ id } data-testid="product">
              <p>{title}</p>
              <img src={ thumbnail } alt={ title } />
              <p>{price}</p>
            </div>
          ))
        ) : 'Nenhum produto foi encontrado'}
      </div>
    );
  }
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
