import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    formName: '',
    isSaveButtonDisabled: true,
  };

  // Chama a função createUser da userAPI
  async componentDidMount() {
    const response = await createUser();
    return console.log(response);
  }

  // Valida se o input do formName tem mais do que 3 characters
  validateButton = () => {
    const { formName, isSaveButtonDisabled } = this.state;
    const TRHEE_NUM = 3;
    let isValid = false;
    if (formName.length > TRHEE_NUM) {
      isValid = true;
    } else {
      isValid = false;
    }
    this.setState({
      isSaveButtonDisabled: !isValid,
    });
    return isSaveButtonDisabled;
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        // Realiza a validação do botão cada vez que alterar algo na tela
        this.validateButton();
      },
    );
  };

  // onSaveButtonClick= () = {

  // }

  render() {
    const { formName, isSaveButtonDisabled } = this.state;
    return (
      <BrowserRouter>
        <Route exact path="/">
          <Login
            formName={ formName }
            onInputChange={ this.onInputChange }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
        </Route>
        <Route exact path="/search" component={ Search } />
        <Route
          exact
          path="/album/:id"
          render={ (props) => <Album { ...props } id="" /> }
        />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
