import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics, addFavorite } = this.props;
    return (
      <div>
        <li
          data-testid="artist-name"
        >
          {musics.trackName}
        </li>
        <audio data-testid="audio-component" src={ musics.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favoriteSong">
          Favorita
          <input
            data-testid={ `checkbox-music-${musics.trackId}` }
            name="favoriteSong"
            type="checkbox"
            id="favoriteSong"
            onClick={ addFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  musics: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
