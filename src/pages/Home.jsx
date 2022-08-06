import React, { Component } from 'react';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import Search from '../components/Search';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    searchValue: '',
  }

  async componentDidMount() {
    const allCategories = await getCategories();
    this.setState({ allCategories });
  }

  onInputChange = async ({ target }) => {
    const { name, value, id } = target;
    this.setState({ [name]: value });
    if (id) {
      const result = await getCategories(id);
      this.setState({ categoryList: result.results });
    }
  }

  render() {
    const { allCategories, searchValue, categoryList } = this.state;
    return (
      <div>
        <div>
          { allCategories && allCategories.map((category) => (
            <Categories
              key={ category.id }
              category={ category }
              onInputChange={ this.onInputChange }
            />
          ))}
        </div>

        {categoryList && <ProductCard products={ categoryList } />}

        <Search
          onInputChange={ this.onInputChange }
          searchValue={ searchValue }
        />
      </div>
    );
  }
}
