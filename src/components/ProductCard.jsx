import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addProduct } from '../services/localStorage';

export default class ProductCard extends Component {
  state = {
  }

  componentDidMount() {

  }

  handleButtonClick = ({ thumbnail, title, id }) => {
    const obj = { id, name: title, image: thumbnail, count: 1 };
    addProduct(obj);
  }

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
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.handleButtonClick(product) }
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
};
