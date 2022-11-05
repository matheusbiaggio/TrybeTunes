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
    done: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { musics, done } = this.state;
    const response = await musicList(id);
    this.setState({
      musics: response.slice(1),
      done: true,
    });
    console.log(musics, done);
  }

  addFavorite = async () => {
    const { musics, done } = this.state;
    this.setState({
      done: false,
    });
    console.log('adicionou');
    const addFavoriteSong = await addSong(...musics);
    this.setState({
      done: true,
    });
    console.log(addFavoriteSong, done);
  };

  render() {
    const { musics, done } = this.state;
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
                <h2 data-testid="artist-name">{musics[0].artistName}</h2>
                <h3 data-testid="album-name">{musics[0].collectionName}</h3>
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
