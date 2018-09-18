import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { modalBlur } from '../../global-styles/mixins';

export const Sidebar = styled.nav`
  padding-right: 20px;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
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

  &.${activeClassName} {
    color: black;
  }
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
