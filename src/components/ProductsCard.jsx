import React, { Component } from 'react';

export default class ProductsCard extends Component {
  render() {
    return (
      <div>
        
        <div key={ id } data-testid="product">
          <p>{title}</p>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
        </div>
      </div>
    );
  }
}
