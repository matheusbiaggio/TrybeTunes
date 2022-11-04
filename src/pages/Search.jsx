import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    formArtist: '',
    isSaveButtonDisabled: true,
  };

  // Valida se o input do formName tem mais do que 3 characters
  validateButton = () => {
    const { formArtist, isSaveButtonDisabled } = this.state;
    const TWO_NUM = 2;
    let isValid = false;
    if (formArtist.length >= TWO_NUM) {
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

  render() {
    const { formArtist, isSaveButtonDisabled} = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="formArtist">
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Nome do Artista"
              id="formArtist"
              name="formArtist"
              value={ formArtist }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isSaveButtonDisabled }
            onClick={ this.onSaveButtonClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
