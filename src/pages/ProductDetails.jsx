import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDetails } from '../services/api';
import { addProduct, getProductsCard } from '../services/localStorage';
import ProductAvaliation from '../components/ProductAvaliation';
import { addAvaliation, getListAvaliation } from '../services/avaliationLocalStorage';

export default class ProductDetails extends Component {
  state = {
    email: '',
    text: '',
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const productList = getProductsCard();
    const checkLengthProductList = productList ? productList
      .reduce((acc, curr) => (acc + curr.count), 0) : 0;
    this.setState({ checkLengthProductList });
    const productDetails = await getDetails(id);
    const listAvaliation = getListAvaliation(id);
    this.setState({ productDetails, listAvaliation });
  }

  handleClickButton = () => {
    const { productDetails } = this.state;
    const { title, thumbnail, id, availableQuantity } = productDetails;
    const obj = { id, name: title, image: thumbnail, count: 1, availableQuantity };
    console.log(obj);
    addProduct(obj);
  }

  handleClickForm = (event) => {
    event.preventDefault();
    const { email, text, rating } = this.state;
    const obj = { email, text, rating };
    const { match: { params: { id } } } = this.props;
    addAvaliation(id, obj);
    this.setState({
      emailEvaluation: email,
      textAreaEvaluation: text,
      radioEvaluator: rating,
      email: '',
      text: '',
      rating: '',
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      productDetails,
      email,
      text,
      emailEvaluation,
      textAreaEvaluation,
      radioEvaluator,
      listAvaliation,
      checkLengthProductList,
    } = this.state;
    return (
      <div>
        <p data-testid="shopping-cart-size">{checkLengthProductList}</p>
        { productDetails && (
          <div>
            <p data-testid="product-detail-name">{productDetails.title}</p>
            <img
              data-testid="product-detail-image"
              src={ productDetails.thumbnail }
              alt={ productDetails.title }
            />
            <p data-testid="product-detail-price">{productDetails.price}</p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.handleClickButton }
            >
              Adicionar carrinho
            </button>
            <Link
              to="/shoppingcart"
              data-testid="shopping-cart-button"
            >
              Carrinho de compras
            </Link>
          </div>
        )}
        <div>
          <form>
            <label htmlFor="email">
              <input
                type="email"
                data-testid="product-detail-email"
                name="email"
                onChange={ this.onInputChange }
                value={ email }
                id="email"
              />
            </label>
            <input
              type="radio"
              name="rating"
              value="1"
              data-testid="1-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="rating"
              value="2"
              data-testid="2-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="rating"
              value="3"
              data-testid="3-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="rating"
              value="4"
              data-testid="4-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="rating"
              value="5"
              data-testid="5-rating"
              onChange={ this.onInputChange }
            />
            <label htmlFor="text">
              <textarea
                type="text"
                name="text"
                data-testid="product-detail-evaluation"
                onChange={ this.onInputChange }
                id="text"
                value={ text }
              />
            </label>
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.handleClickForm }
            >
              Enviar
            </button>
            { listAvaliation && (
              listAvaliation.map((avaliation, index) => (
                <div key={ index }>
                  <span data-testid="review-card-email">{avaliation.email}</span>
                  <span data-testid="review-card-evaluation">{avaliation.text}</span>
                  <span data-testid="review-card-rating">{avaliation.rating}</span>
                </div>
              )))}
          </form>
          { emailEvaluation
            && <ProductAvaliation
              email={ emailEvaluation }
              comment={ textAreaEvaluation }
              radio={ radioEvaluator }
            />}
        </div>
      </div>
    );
  }
}
ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
