import React, { Component } from 'react';
import Categories from '../components/Categories';
import Search from '../components/Search';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    searchValue: '',
    categoryList: ['a'],
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

        {categoryList.length === 0 ? (<span>Nenhum produto foi encontrado</span>) : (
          categoryList[0] !== 'a' && (
            categoryList.map(({ title, price, thumbnail, id }) => (

              <div key={ id } data-testid="product">
                <p>{title}</p>
                <img src={ thumbnail } alt={ title } />
                <p>{price}</p>
              </div>
            )))
        )}

        <Search
          onInputChange={ this.onInputChange }
          searchValue={ searchValue }
        />
      </div>
    );
  }
}
