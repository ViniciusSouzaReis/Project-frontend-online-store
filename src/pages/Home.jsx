import React, { Component } from 'react';
import Categories from '../components/Categories';
import Search from '../components/Search';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {

  }

  async componentDidMount() {
    const allCategories = await getCategories();
    this.setState({ allCategories });
  }

  render() {
    const { allCategories } = this.state;
    return (
      <div>
        <div>
          { allCategories && allCategories.map((category) => (
            <Categories key={ category.id } category={ category } />
          ))}
        </div>
        <Search />
      </div>
    );
  }
}
