import styled from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  gap: 50px;

  a:link {
    color: #28405E;
  }

/* link que foi visitado */
  a:visited {
    color: #28405E;
  }

/* mouse over */
  a:hover {
    color: #28405E;
  }

/* link selecionado */
  a:active {
    color: #28405E;
  }

  img {
    width: 25px;
  }
`;

export default Navbar;
