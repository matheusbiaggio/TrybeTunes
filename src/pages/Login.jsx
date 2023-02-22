import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import WrapperCenter from '../components/styled/wrapper/Centralize';
import LoginForm from '../components/styled/login/Form';
import Button from '../components/styled/buttons/DefaultBtn';
import Input from '../components/styled/inputs/DefaultInputs';
import { MainTitle } from '../components/styled/titles/Main';
import PositionBtn from '../components/styled/login/PositionBtn';
import PositionInput from '../components/styled/login/PositionInput';
import PositionTitle from '../components/styled/login/PositionTitle';

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
      <WrapperCenter>
        <div data-testid="page-login">
          {
            done
              ? (
                <LoginForm>
                  <PositionTitle>
                    <MainTitle>TrybeTunes</MainTitle>
                  </PositionTitle>
                  <PositionInput>
                    <Input
                      data-testid="login-name-input"
                      type="text"
                      placeholder="Usuário"
                      id="formName"
                      name="formName"
                      value={ formName }
                      onChange={ this.onInputChange }
                    />
                  </PositionInput>
                  <PositionBtn>
                    <Button
                      data-testid="login-submit-button"
                      type="button"
                      disabled={ isSaveButtonDisabled }
                      onClick={ this.onSaveButtonClick }
                    >
                      Entrar
                    </Button>
                  </PositionBtn>
                </LoginForm>)
              : <Loading />
          }
        </div>
      </WrapperCenter>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
