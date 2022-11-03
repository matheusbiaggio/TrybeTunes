import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const {
      formName,
      onInputChange,
      isSaveButtonDisabled,
      onSaveButtonClick,
    } = this.props;
    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="formName">
            <input
              type="text"
              placeholder="Usuário"
              id="formName"
              name="formName"
              value={ formName }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            OK
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  formName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Login;
