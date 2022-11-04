import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    formArtist: '',
    isSaveButtonDisabled: true,
    done: true,
    prhaseResult: '',
    albumList: [],
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

  onSaveButtonClick = async () => {
    const {
      formArtist,
      isSaveButtonDisabled,
      done,
      prhaseResult,
      albumList,
    } = this.state;
    const phrase = `Resultado de álbuns de: ${formArtist}`;
    this.setState({
      done: false,
    });
    const searchAlbum = await searchAlbumsAPI(formArtist);
    console.log(searchAlbum, isSaveButtonDisabled, done, prhaseResult, albumList);
    this.setState({
      formArtist: '',
      isSaveButtonDisabled: true,
      done: true,
      prhaseResult: phrase,
      albumList: searchAlbum,
    });
  };

  render() {
    const {
      formArtist,
      isSaveButtonDisabled,
      done,
      prhaseResult,
      albumList } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          done
            ? (
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
              </form>)
            : <Loading />
        }
        {prhaseResult}
        {
          albumList.length
            ? (
              <ul>
                {albumList.map((album) => (
                  <li key={ album.collectionId }>
                    {album.collectionName}
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      Pesquisar
                    </Link>
                  </li>))}
              </ul>
            )
            : <spam>Nenhum álbum foi encontrado</spam>
        }

      </div>
    );
  }
}

export default Search;
