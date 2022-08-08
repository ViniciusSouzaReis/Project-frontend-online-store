import React, { Component } from 'react';
import { getProductsCard, removeProduct } from '../services/test';

export default class ShoppingCartList extends Component {
  state = {
  }

  componentDidMount() {
    const productList = getProductsCard();
    if (productList.length > 0) {
      this.setState({ shoppingList: productList, quantity: productList.length });
    }
  }

  handleClickButton = (param) => {
    removeProduct(param);
    const { shoppingList } = this.state;
    const newProducts = shoppingList.filter((item) => item.id !== param.id);
    this.setState({ shoppingList: newProducts });
  }

  handleClickDecrease = () => {
    console.log('a');
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
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ this.handleClickDecrease }
                  >
                    -
                  </button>
                  {item.count}
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ () => this.handleClickButton(item) }
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
