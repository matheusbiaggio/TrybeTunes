import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import musicList from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    name: '',
    album: '',
    done: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await musicList(id);
    this.setState({
      name: response[0].artistName,
      album: response[0].collectionName,
      musics: response.slice(1),
      done: true,
    });
  }

  addFavorite = async (id) => {
    const { musics } = this.state;
    this.setState({
      done: false,
    });
    console.log('adicionou');
    const addFavoriteSong = await addSong(...musics);
    this.setState({
      done: true,
    });
    console.log(addFavoriteSong);
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
                      addFavorite={ this.addFavorite }
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
