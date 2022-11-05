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
    favoritesMusics: [],
    name: '',
    album: '',
    done: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await musicList(id);
    const onlyMusic = response.slice(1);
    this.setState({
      name: response[0].artistName,
      album: response[0].collectionName,
      musics: onlyMusic,
      done: true,
    });
  }

  addFavorite = async (music) => {
    const { musics, favoritesMusics } = this.state;
    this.setState({
      done: false,
    });
    const selectedMusic = musics.findIndex(({ trackId }) => trackId === music.trackId);
    const clickedMusic = musics[selectedMusic];
    console.log('antes de mudar', clickedMusic.checked);
    clickedMusic.checked = !clickedMusic.checked;
    console.log('depois de mudar', clickedMusic.checked);
    await addSong(music);
    this.setState({
      done: true,
      favoritesMusics: { ...favoritesMusics, music },
    });
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
