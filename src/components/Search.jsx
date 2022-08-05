import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Search extends Component {
  state = {
    searchValue: '',
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <input type="text" name="searchValue" onChange={ this.onInputChange } />
        {!searchValue
          && (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)}
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
