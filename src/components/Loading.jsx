import React, { Component } from 'react';
import loadingGif from '../images/loading.gif';

class Loading extends Component {
  render() {
    return (
      <img src={ loadingGif } alt="loading" />
    );
  }
}

export default Loading;
