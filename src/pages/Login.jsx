import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    formName: '',
    isSaveButtonDisabled: true,
    done: true,
  };

  // Valida se o input do formName tem mais do que 3 characters
  validateButton = () => {
    const { formName, isSaveButtonDisabled } = this.state;
    const TRHEE_NUM = 3;
    let isValid = false;
    if (formName.length >= TRHEE_NUM) {
      isValid = true;
    } else {
      isValid = false;
    }
    this.setState({
      isSaveButtonDisabled: !isValid,
    });
    return isSaveButtonDisabled;
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        // Realiza a validação do botão cada vez que alterar algo na tela
        this.validateButton();
      },
    );
  };

  onSaveButtonClick = async () => {
    const { formName } = this.state;
    const { history } = this.props;

    this.setState({
      done: false,
    });
    await createUser({ name: formName });
    this.setState({
      done: true,
    });
    return (history.push('/search'));
  };

  render() {
    const {
      formName,
      isSaveButtonDisabled,
      done,
    } = this.state;
    return (
      <div data-testid="page-login">
        {
          done
            ? (
              <form>
                <label htmlFor="formName">
                  <input
                    data-testid="login-name-input"
                    type="text"
                    placeholder="Usuário"
                    id="formName"
                    name="formName"
                    value={ formName }
                    onChange={ this.onInputChange }
                  />
                </label>
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ isSaveButtonDisabled }
                  onClick={ this.onSaveButtonClick }
                >
                  Entrar
                </button>
              </form>)
            : <Loading />
        }

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
