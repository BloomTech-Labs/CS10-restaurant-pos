import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { modalBlur } from '../../../global-styles/mixins';

export const Sidebar = styled.nav`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 75px;
  width: 230px;
  flex-shrink: 0;
  max-width: ${props => props.theme.sideBarWidth}px;
  background: ${props => props.theme.appPrimary};
  ${(props) => props.modalIsOpen && modalBlur};
  overflow-y: auto;
`;

const activeClassName = 'nav-item-active';

export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  color: ${(props) => props.theme.lightText};
  font-weight: 600;
  text-decoration: none;
  margin-left: 10px;
  height: 55px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 25px;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    color: ${(props) => props.theme.medTextLight};
  }

  &.${activeClassName} {
    color: ${(props) => props.theme.primaryText};
    font-weight: 700;
    padding-left: 17px;
    background: ${props => props.theme.contentBackground};
    border-left: 8px solid ${props => props.theme.navTabColor};
    border-radius: 10px 0 0 10px;
    transition:
      background 0.2s ease-in-out,
      border-left 0.2s ease-in-out,
      padding-left 0.2s ease-in-out;
  }
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
`;
