import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductAvaliation extends Component {
  state = {
    validationReturn: false,
  }

  componentDidMount() {
    const { email } = this.props;
    const checkEmail = this.validEmail(email);
    this.setState({
      validationReturn: checkEmail,
    });
  }

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

  render() {
    const { email, comment, radio } = this.props;
    const { validationReturn } = this.state;
    return (
      validationReturn ? (
        <div>
          <span>{email}</span>
          <span>{comment}</span>
          <span>{radio}</span>
        </div>
      ) : <span data-testid="error-msg">Campos inválidos</span>
    );
  }
}

ProductAvaliation.propTypes = {
  email: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  radio: PropTypes.string.isRequired,
};
