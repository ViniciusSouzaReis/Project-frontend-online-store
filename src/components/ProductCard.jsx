import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { products, handleButtonClickProduct } = this.props;
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
                {product.shipping.free_shipping && (
                  <p
                    data-testid="free-shipping"
                  >
                    Frete Grátis
                  </p>)}
              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => handleButtonClickProduct(product) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        ) : 'Nenhum produto foi encontrado'}
      </div>
    );
  }
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  handleButtonClickProduct: PropTypes.func.isRequired,
};
