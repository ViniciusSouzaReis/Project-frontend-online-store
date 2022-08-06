import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Search extends Component {
  state = {
    searchValue: '',
    products: ['a'],
  }

  handleChangeButton = async () => {
    const { searchValue } = this.props;
    this.setState({ searchValue });
    const response = await getProductsFromCategoryAndQuery(searchValue);
    this.setState({ products: response.results });
  }

  render() {
    const { searchValue, products } = this.state;
    const { onInputChange } = this.props;
    return (
      <div>
        <input
          type="text"
          name="searchValue"
          onChange={ onInputChange }
          data-testid="query-input"
        />
        {!searchValue
          && (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)}
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleChangeButton }
        >
          Pesquisar
        </button>
        {products.length === 0 ? (<span>Nenhum produto foi encontrado</span>) : (
          products[0] !== 'a' && (
            products.map(({ title, price, thumbnail, id }) => (
              <div key={ id } data-testid="product">
                <p>{title}</p>
                <img src={ thumbnail } alt={ title } />
                <p>{price}</p>
              </div>
            )))
        )}
        <Link
          data-testid="shopping-cart-button"
          to="/shoppingcart"
        >
          Carrinho de compras
        </Link>

      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};
