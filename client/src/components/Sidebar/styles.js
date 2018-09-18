import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { modalBlur } from '../../global-styles/mixins';

export const Navbar = styled.nav`
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  background: red;
  ${(props) => props.modalIsOpen && modalBlur};
`;

const activeClassName = 'nav-item-active';

export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  color: white;
  text-decoration: none;
  margin-left: 10px;
  display: flex;
  flex-direction: column;

  &.${activeClassName} {
    color: black;
  }
`;
