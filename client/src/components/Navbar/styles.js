import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { modalBlur } from '../../global-styles/mixins';

export const Navbar = styled.nav`
  padding-right: 20px;
  width: 100%;
  height: ${props => props.theme.topBarHeight}px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${(props) => props.theme.appPrimary};
  ${(props) => props.modalIsOpen && modalBlur};
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primaryText};
  text-decoration: none;
  margin-left: 10px;
`;
