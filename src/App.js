import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import ShoppingCartList from './components/ShoppingCartList';

export default class App extends Component {
  state = {
    shoppingCartContents: '',
  }

  render() {
    const { shoppingCartContents } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Search } />
          <Route
            exact
            path="/shoppingcart"
            render={
              () => (<ShoppingCartList shoppingList={ shoppingCartContents } />)
            }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
