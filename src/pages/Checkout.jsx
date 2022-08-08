import React, { Component } from 'react';
import { getProductsCard } from '../services/localStorage';

export default class Checkout extends Component {
  state = {
  }

  componentDidMount() {
    const productList = getProductsCard();
    if (productList.length > 0) {
      this.setState({ productList });
    }
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <ul>
          { productList && productList.map((item, index) => (
            <li key={ index }>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
