import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={ product.id } data-testid="product">
              <Link
                to={ `/productDetails/${product.id}` }
                data-testid="product-detail-link"
              >
                <p>{product.title}</p>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{product.price}</p>
              </Link>
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
