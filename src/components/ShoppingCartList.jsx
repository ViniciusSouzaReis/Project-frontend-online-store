import React, { Component } from 'react';
import { getProductsCard } from '../services/test';

export default class ShoppingCartList extends Component {
  state = {
  }

  componentDidMount() {
    const productList = getProductsCard();
    if (productList.length > 0) {
      this.setState({ shoppingList: productList, quantity: productList.length });
    }
  }

  render() {
    const { shoppingList, quantity } = this.state;
    return (
      <div>
        {!shoppingList
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (
            <ul>
              {shoppingList.map((item) => (
                <li
                  key={ item.id }
                >
                  <span data-testid="shopping-cart-product-quantity">{quantity}</span>
                  <span data-testid="shopping-cart-product-name">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
}
