import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDetails } from '../services/api';

export default class ProductDetails extends Component {
  state = {

  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const productDetails = await getDetails(id);
    this.setState({ productDetails });
  }

  handleChangeButton = () => {
    const { history } = this.props;
    history.push('/shoppingcart');
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
              data-testid="shopping-cart-button"
              onClick={ this.handleChangeButton }
            >
              Adicionar carrinho
            </button>
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
