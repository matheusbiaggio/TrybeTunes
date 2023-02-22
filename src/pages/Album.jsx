import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicList from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { Position } from '../components/styled/musicCard/MainPage';
import {
  MainTitle,
  ThirdTitle,
} from '../components/styled/musicCard/Titles';
import ContainerCard from '../components/styled/searchPage/ContainerCard';

class Album extends Component {
  state = {
    musics: [],
    favoritesMusics: [],
    name: '',
    album: '',
    done: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    // requisição para a API para gerar a lista de musica conforme o id recebido pela URL
    const response = await musicList(id);
    // gerando uma lista com as musicas favoritas
    const listFavoriteMusics = await getFavoriteSongs();
    // retirando o primeiro elemento do array da lista de musica, pois ele é uma informação do album
    const onlyMusic = response.slice(1);
    this.setState({
      favoritesMusics: listFavoriteMusics,
      name: response[0].artistName,
      album: response[0].collectionName,
      musics: onlyMusic,
      done: true,
    }, () => { this.teste(); });
  }

  teste = () => {
    const { musics, favoritesMusics } = this.state;
    for (let i = 0; i < musics.length; i += 1) {
      for (let y = 0; y < favoritesMusics.length; y += 1) {
        if (musics[i].trackId === favoritesMusics[y].trackId) {
          musics[i].checked = true;
        }
      }
    }
  };

  addFavorite = async (music) => {
    const { musics, favoritesMusics } = this.state;
    // tela de loading
    this.setState({
      done: false,
    });
    // selecionando o index da musica clicada
    const selectedMusic = musics.findIndex(({ trackId }) => trackId === music.trackId);
    // pegando a musica clicada através do seu index no array de musicas
    const clickedMusic = musics[selectedMusic];
    // lógica para checked ou unchecked
    if (clickedMusic.checked === true) {
      clickedMusic.checked = false;
      // remove a musica dos favoritos
      await removeSong(music);
    } else {
      clickedMusic.checked = true;
      // adiciona a musica aos favoritos
      await addSong(music);
    }
    this.setState({
      done: true,
    }, () => {
      this.setState({
        favoritesMusics: { ...favoritesMusics, clickedMusic },
      });
    });
  };

  render() {
    const { musics, done, name, album } = this.state;
    return (
      <div data-testid="page-album">
        <Position>
          <Header />
          <div>
            {
              done
                ? (
                  <div>
                    <MainTitle>
                      Banda:
                    </MainTitle>
                    <MainTitle data-testid="artist-name">{name}</MainTitle>
                    <ThirdTitle data-testid="album-name">{album}</ThirdTitle>
                    <ContainerCard>
                      {
                        musics.map((music) => (<MusicCard
                          musics={ music }
                          key={ music.trackId }
                          addFavorite={ () => this.addFavorite(music) }
                        />
                        ))
                      }
                    </ContainerCard>
                  </div>)
                : <Loading />
            }
          </div>

        </Position>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
