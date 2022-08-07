import React, { Component } from 'react';

export default class ShoppingCartList extends Component {
  state = {
  }

  componentDidMount() {
    const result = JSON.parse(localStorage.getItem('shoppingList'));
    this.setState({ shoppingList: result });
    console.log(this.checkCount(result));
  }

  render() {
    const { shoppingList } = this.state;
    return (
      <div>
        {!shoppingList
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : (
            <ul>
              {shoppingList.map((item) => (
                <li
                  data-testid="shopping-cart-product-name"
                  key={ item.id }
                >
                  <span data-testid="shopping-cart-product-name">{item.name}</span>
                  <span data-testid="shopping-cart-product-quantity">{item.count}</span>
                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
}
