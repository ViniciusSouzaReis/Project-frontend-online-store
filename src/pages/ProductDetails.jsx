import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDetails } from '../services/api';
import { addProduct } from '../services/test';

export default class ProductDetails extends Component {
  state = {

  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const productDetails = await getDetails(id);
    this.setState({ productDetails });
  }

  handleClickButton = () => {
    const { productDetails } = this.state;
    const { title, thumbnail, id } = productDetails;
    const obj = { id, name: title, image: thumbnail, count: 1 };
    addProduct(obj);
  }

  render() {
    const { productDetails } = this.state;
    return (
      <div>
        { productDetails && (
          <div>
            <p data-testid="product-detail-name">{productDetails.title}</p>
            <img
              data-testid="product-detail-image"
              src={ productDetails.thumbnail }
              alt={ productDetails.title }
            />
            <p data-testid="product-detail-price">{productDetails.price}</p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.handleClickButton }
            >
              Adicionar carrinho
            </button>
            <Link
              to="/shoppingcart"
              data-testid="shopping-cart-button"
            >
              Carrinho de compras
            </Link>
          </div>
        )}
      </div>
    );
  }
}
ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
