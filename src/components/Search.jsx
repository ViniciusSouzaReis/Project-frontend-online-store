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

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <input type="text" name="searchValue" onChange={ this.onInputChange } />
        {!searchValue
          && (
            <span
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>)}
      </div>
    );
  }
}
