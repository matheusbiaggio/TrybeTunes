import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userNameState: {},
    done: false,
  };

  async componentDidMount() {
    const { userNameState, done } = this.state;
    const userName = await getUser();
    this.setState({
      userNameState: userName.name,
      done: true,
    });
    console.log(userNameState, done);
  }

  render() {
    const { userNameState, done } = this.state;
    return (
      <header data-testid="header-component">
        {
          done
            ? <p data-testid="header-user-name">{ userNameState }</p>
            : <Loading />
        }
      </header>
    );
  }
}

export default Header;
