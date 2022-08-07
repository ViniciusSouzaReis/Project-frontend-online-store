import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const newArray = [];
export default class ProductCard extends Component {
  state = {
    shoppingList: [],
    count: 1,
  }

  componentDidMount() {
    const result = JSON.parse(localStorage.getItem('shoppingList'));
    this.setState({ storageShoppingList: result });
  }

  handleButtonClick = (product) => {
    const { shoppingList, count, storageShoppingList } = this.state;
    const checkReapet = shoppingList.some((item) => item.id === product.id);

    if (!checkReapet) {
      console.log('primeiro if');
      const newObj = {
        name: product.title,
        image: product.thumbnail,
        id: product.id,
        count,
      };
      newArray.push(newObj);
      localStorage.setItem('shoppingList', JSON.stringify(newArray));
    }

    if (checkReapet) {
      const repeat = storageShoppingList.filter((item) => item.id === product.id);
      console.log(repeat[0].name);
      const newObj = {
        name: repeat[0].name,
        image: repeat[0].image,
        count: repeat[0].count += 1,
        id: repeat[0].id,
      };
      const lastIndex = -1;
      newArray.push(newObj);
      const result = newArray.filter((item) => item.id === newObj.id);
      localStorage.setItem('shoppingList', JSON.stringify(result.at(lastIndex)));
    }

    this.setState((prevState) => ({
      shoppingList: [...prevState.shoppingList, product] }
    ));
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={ product.id } data-testid="product">
              <Link
                to={ `/productDetails/${product.id}` }
                data-testid="product-detail-link"
              >
                <p>{product.title}</p>
                <img src={ product.thumbnail } alt={ product.title } />
                <p>{product.price}</p>
              </Link>
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ () => this.handleButtonClick(product) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        ) : 'Nenhum produto foi encontrado'}
      </div>
    );
  }
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
