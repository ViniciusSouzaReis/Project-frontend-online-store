import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  handleInputChange = ({ target }) => {
    const { name, value, type } = target;
    const nameInput = type === 'radio' ? value : '';
    this.setState({ [name]: value, nameInput });
  }

  handleClickSubmit = (event) => {
    event.preventDefault();
    const {
      fullName,
      email,
      cpf,
      tellphone,
      cep,
      address,
      nameInput,
    } = this.state;
    const { history } = this.props;
    const test = [
      fullName,
      email,
      cpf,
      tellphone,
      cep,
      address,
      nameInput,
    ];
    const checkInputs = test.some((item) => item === '' || item === undefined);
    this.setState({ errorMessage: checkInputs });
    if (!checkInputs) {
      localStorage.clear();
      history.push('/');
    }
  }

  render() {
    const {
      productList,
      fullName,
      email,
      cpf,
      tellphone,
      cep,
      address,
      errorMessage,
    } = this.state;
    return (
      <div>
        <ul>
          { productList && productList.map((item, index) => (
            <li key={ index }>{item.name}</li>
          ))}
        </ul>
        <form>
          <input
            type="text"
            name="fullName"
            value={ fullName }
            onChange={ this.handleInputChange }
            data-testid="checkout-fullname"
          />
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleInputChange }
            data-testid="checkout-email"
          />
          <input
            type="text"
            name="cpf"
            value={ cpf }
            onChange={ this.handleInputChange }
            data-testid="checkout-cpf"
          />
          <input
            type="text"
            name="tellphone"
            value={ tellphone }
            onChange={ this.handleInputChange }
            data-testid="checkout-phone"
          />
          <input
            type="text"
            name="cep"
            value={ cep }
            onChange={ this.handleInputChange }
            data-testid="checkout-cep"
          />
          <input
            type="text"
            name="address"
            value={ address }
            onChange={ this.handleInputChange }
            data-testid="checkout-address"
          />
          <input
            type="radio"
            name="payment"
            value="ticket"
            onChange={ this.handleInputChange }
            data-testid="ticket-payment"
          />
          <input
            type="radio"
            name="payment"
            value="visa"
            onChange={ this.handleInputChange }
            data-testid="visa-payment"
          />
          <input
            type="radio"
            name="payment"
            value="master"
            onChange={ this.handleInputChange }
            data-testid="master-payment"
          />
          <input
            type="radio"
            name="payment"
            value="elo"
            onChange={ this.handleInputChange }
            data-testid="elo-payment"
          />
          <button
            type="submit"
            onClick={ this.handleClickSubmit }
            data-testid="checkout-btn"
          >
            Pagar
          </button>
        </form>
        <div data-testid="error-msg">
          { errorMessage && (
            <span>Campos inválidos</span>
          )}
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
