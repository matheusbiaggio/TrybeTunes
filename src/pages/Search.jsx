import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import Position from '../components/styled/searchPage/positionMainPage';
import Input from '../components/styled/inputs/Searchbar';
import Button from '../components/styled/buttons/Searchbar';
import Searchbar from '../components/styled/searchBar/Searchbar';
import Main from '../components/styled/searchPage/MainContent';
import WrapperCenter from '../components/styled/wrapper/Centralize';
import { CardWrapper, CardHeader } from '../components/styled/searchPage/Card';
import ContainerCard from '../components/styled/searchPage/ContainerCard';
import MainTitle from '../components/styled/titles/SearchTitle';

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
    const { history } = this.props;
    const {
      formArtist,
      isSaveButtonDisabled,
      done,
      prhaseResult,
      albumList } = this.state;
    return (
      <Position data-testid="page-search">
        <Header />
        <div>
          {
            done
              ? (
                <Searchbar>
                  <Input
                    data-testid="search-artist-input"
                    type="text"
                    placeholder="O que voce quer ouvir?"
                    id="formArtist"
                    name="formArtist"
                    value={ formArtist }
                    onChange={ this.onInputChange }
                  />
                  <Button
                    data-testid="search-artist-button"
                    type="button"
                    disabled={ isSaveButtonDisabled }
                    onClick={ this.onSaveButtonClick }
                  >
                    Pesquisar
                  </Button>
                </Searchbar>)
              : <WrapperCenter><Loading /></WrapperCenter>
          }
          <MainTitle>{prhaseResult}</MainTitle>
          <Main>
            {
              albumList.length
                ? (
                  <ContainerCard>
                    {albumList.map((album) => (
                      <CardWrapper key={ album.collectionId }>
                        <CardHeader>{album.collectionName}</CardHeader>
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        <Button
                          onClick={ () => (history.push(`/album/${album.collectionId}`)) }
                          data-testid={ `link-to-album-${album.collectionId}` }
                        >
                          Selecionar
                        </Button>
                      </CardWrapper>))}
                  </ContainerCard>
                )
                : <spam>Nenhum álbum foi encontrado</spam>
            }
          </Main>
        </div>
      </Position>
    );
  }
}

Search.propTypes = {}.isRequired;

export default Search;
