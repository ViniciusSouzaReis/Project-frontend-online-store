import React, { Component } from 'react';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import Search from '../components/Search';
import { getCategories } from '../services/api';
import { getProductsCard, addProduct } from '../services/localStorage';

export default class Home extends Component {
  state = {
    searchValue: '',
  }

  async componentDidMount() {
    const productList = getProductsCard();
    const checkLengthProductList = productList ? productList.length : 0;
    const allCategories = await getCategories();
    this.setState({ allCategories, checkLengthProductList });
  }

  onInputChange = async ({ target }) => {
    const { name, value, id } = target;
    this.setState({ [name]: value });
    if (id) {
      const result = await getCategories(id);
      this.setState({ categoryList: result.results });
    }
  }

  handleButtonClickProduct = ({
    thumbnail, title, id, available_quantity: availableQuantity }) => {
    const obj = { id, name: title, image: thumbnail, count: 1, availableQuantity };
    addProduct(obj);
    const productList = getProductsCard();
    const checkLengthProductList = productList ? productList.length : 0;
    this.setState({ checkLengthProductList });
  }

  render() {
    const {
      allCategories, searchValue, categoryList, checkLengthProductList } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-size">{checkLengthProductList}</p>
        <div>
          { allCategories && allCategories.map((category) => (
            <Categories
              key={ category.id }
              category={ category }
              onInputChange={ this.onInputChange }
            />
          ))}
        </div>

        {categoryList && (
          <ProductCard
            products={ categoryList }
            handleButtonClickProduct={ this.handleButtonClickProduct }
          />)}

        <Search
          onInputChange={ this.onInputChange }
          searchValue={ searchValue }
        />
      </div>
    );
  }
}
