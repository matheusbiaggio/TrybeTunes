import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        {
          done
            && <p data-testid="header-user-name">{ userNameState }</p>
        }
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
