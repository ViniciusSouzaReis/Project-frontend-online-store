import React, { Component } from 'react';
import { getProductsCard, removeProduct, addProduct } from '../services/localStorage';

export default class ShoppingCartList extends Component {
  state = {
  }

  componentDidMount() {
    const productList = getProductsCard();
    if (productList.length > 0) {
      this.setState({ shoppingList: productList });
    }
  }

  handleClickRemove = (param) => {
    removeProduct(param, 'remove');
    const productList = getProductsCard();
    this.setState({ shoppingList: productList });
  }

  handleClickIncrease = (item) => {
    addProduct(item);
    const productList = getProductsCard();
    this.setState({ shoppingList: productList });
  }

  handleClickDecrease = (item) => {
    removeProduct(item);
    const productList = getProductsCard();
    this.setState({ shoppingList: productList });
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
                  key={ item.id }
                >
                  <span data-testid="shopping-cart-product-name">{item.name}</span>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.handleClickDecrease(item) }
                  >
                    -
                  </button>
                  <span data-testid="shopping-cart-product-quantity">{item.count}</span>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.handleClickIncrease(item) }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ () => this.handleClickRemove(item) }
                  >
                    Remover item do carrinho
                  </button>
                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
}
