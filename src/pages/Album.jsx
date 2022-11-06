import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicList from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    });
  }

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
    // lógica para checked ou unchecked e adicionando uma nova key na musica clicada para o tratamento da checkbox
    clickedMusic.checked = !clickedMusic.checked;
    // adicionando ao localStorage a musica favorita
    await addSong(music);
    this.setState({
      done: true,
    }, () => {
      this.setState({
        favoritesMusics: { ...favoritesMusics },
      });
    });
    console.log(favoritesMusics);
  };

  render() {
    const { musics, done, name, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>
          Banda:
        </p>
        {
          done
            ? (
              <div>
                <h2 data-testid="artist-name">{name}</h2>
                <h3 data-testid="album-name">{album}</h3>
                <ul>
                  {
                    musics.map((music) => (<MusicCard
                      musics={ music }
                      key={ music.trackId }
                      addFavorite={ () => this.addFavorite(music) }
                    />
                    ))
                  }
                </ul>
              </div>)
            : <Loading />
        }
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
