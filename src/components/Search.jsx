import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    searchValue: '',
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleChangeButton = () => {
    console.log('oi');
  }

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <input
          type="text"
          name="searchValue"
          onChange={ this.onInputChange }
          data-testid="query-input"
        />
        {!searchValue
          && (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)}
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleChangeButton }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}
