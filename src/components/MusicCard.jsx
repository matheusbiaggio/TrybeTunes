import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics, addFavorite } = this.props;

    return (
      <div>
        <li>
          {musics.trackName}
        </li>
        <audio data-testid="audio-component" src={ musics.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `favorite-${musics.trackId}` }>
          Favorita
          <input
            data-testid={ `checkbox-music-${musics.trackId}` }
            name={ `favorite-${musics.trackId}` }
            type="checkbox"
            id={ `favorite-${musics.trackId}` }
            onChange={ addFavorite }
            checked={ musics.checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  musics: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MusicCard;
