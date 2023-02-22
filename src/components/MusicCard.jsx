import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Position } from './styled/musicCard/ContainerCard';
import { Paragraph } from './styled/musicCard/Titles';

class MusicCard extends Component {
  render() {
    const { musics, addFavorite } = this.props;

    return (
      <Container>
        <Position>
          <Paragraph>{musics.trackName}</Paragraph>
          <label htmlFor={ `favorite-${musics.trackId}` }>
            <input
              data-testid={ `checkbox-music-${musics.trackId}` }
              name={ `favorite-${musics.trackId}` }
              type="checkbox"
              id={ `favorite-${musics.trackId}` }
              onChange={ addFavorite }
              checked={ musics.checked }
            />
            Favoritar
          </label>
        </Position>
        <audio data-testid="audio-component" src={ musics.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </Container>
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
