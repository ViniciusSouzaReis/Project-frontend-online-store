import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ShoppingCartList extends Component {
  render() {
    const { shoppingList } = this.props;
    return (
      <div>
        {!shoppingList
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (
            <ul>
              {shoppingList.map((item) => <li key={ item.id }>{item.img}</li>)}
            </ul>
          )}
      </div>
    );
  }
}

ShoppingCartList.propTypes = {
  shoppingList: PropTypes.string.isRequired,
};
