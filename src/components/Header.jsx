import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Navbar from './styled/sidebar/Navbar';
import Sidebar from './styled/sidebar/Sidebar';
import MainTitle from './styled/titles/Main';
import searchIcont from '../images/icon-search.svg';
import favoriteIcon from '../images/favorite-icon.svg';
import profileIcon from '../images/profile-icon.svg';
import Container from './styled/sidebar/ContainerIcon';

class Header extends Component {
  state = {
    userNameState: {},
    done: false,
  };

  async componentDidMount() {
    const userName = await getUser();
    this.setState({
      userNameState: userName.name,
      done: true,
    });
  }

  render() {
    const { userNameState, done } = this.state;
    return (
      <Sidebar data-testid="header-component">
        <MainTitle>TrybeTunes</MainTitle>
        <Navbar>
          <Container>
            <img src={ searchIcont } alt="searchIcont" />
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          </Container>
          <Container>
            <img src={ favoriteIcon } alt="favoriteIcon" />
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          </Container>
          <Container>
            <img src={ profileIcon } alt="profileIcon" />
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </Container>
        </Navbar>
        {
          done
            && <p data-testid="header-user-name">{ userNameState }</p>
        }
      </Sidebar>
    );
  }
}

export default Header;
