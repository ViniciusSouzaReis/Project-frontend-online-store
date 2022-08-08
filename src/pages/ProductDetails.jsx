import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDetails } from '../services/api';
import { addProduct } from '../services/localStorage';
import ProductAvaliation from '../components/ProductAvaliation';
import { addAvaliation, getListAvaliation } from '../services/avaliationLocalStorage';

export default class ProductDetails extends Component {
  state = {
    email: '',
    textarea: '',
    evaluationList: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const evaluationList = getListAvaliation();
    const productDetails = await getDetails(id);
    this.setState({ productDetails, evaluationList });
  }

  handleClickButton = () => {
    const { productDetails } = this.state;
    const { title, thumbnail, id } = productDetails;
    const obj = { id, name: title, image: thumbnail, count: 1 };
    addProduct(obj);
  }

  handleClickForm = (event) => {
    event.preventDefault();
    const { email, textarea, radio } = this.state;
    const obj = { email, textarea, radio };
    addAvaliation(obj);
    this.setState({
      emailEvaluation: email,
      textAreaEvaluation: textarea,
      radioEvaluator: radio,
      email: '',
      textarea: '',
      radio: '',
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
      textarea,
      emailEvaluation,
      textAreaEvaluation,
      radioEvaluator,
      evaluationList,
    } = this.state;
    return (
      <div>
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
              name="radio"
              value="1"
              data-testid="1-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="radio"
              value="2"
              data-testid="2-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="radio"
              value="3"
              data-testid="3-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="radio"
              value="4"
              data-testid="4-rating"
              onChange={ this.onInputChange }
            />
            <input
              type="radio"
              name="radio"
              value="5"
              data-testid="5-rating"
              onChange={ this.onInputChange }
            />
            <label htmlFor="text">
              <textarea
                type="text"
                name="textarea"
                data-testid="product-detail-evaluation"
                onChange={ this.onInputChange }
                id="text"
                value={ textarea }
              />
            </label>
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.handleClickForm }
            >
              Enviar
            </button>
          </form>
          { emailEvaluation
            && <ProductAvaliation
              email={ emailEvaluation }
              comment={ textAreaEvaluation }
              radio={ radioEvaluator }
            />}
          { evaluationList && (
            <div>
              { evaluationList.map((evaluation, index) => (
                <ProductAvaliation
                  key={ index }
                  email={ evaluation.email }
                  comment={ evaluation.textarea }
                  radio={ evaluation.radio }
                />
              ))}
            </div>
          )}
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
