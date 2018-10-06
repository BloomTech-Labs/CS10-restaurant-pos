import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { modalBlur, flexCenterMixin } from '../../../global-styles/mixins';

export const Topbar = styled.nav`
  display: flex;
  position: relative;
  flex-shrink: 0;
  justify-content: ${(props) => (props.alignEnd ? 'flex-end' : 'space-between')};
  align-items: center;
  width: 100%;
  height: ${(props) => props.theme.topBarHeight}px;
  padding: 0 50px;
  border-top: 4px solid ${(props) => props.theme.appSecondary};
  ${(props) => props.blur && modalBlur};
`;

export const Title = styled.h1`
  ${flexCenterMixin};
  font-size: ${(props) => props.theme.h1}rem;
  position: fixed;
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  width: 300px;
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primaryText};
  text-decoration: none;
  left: 10px;
`;

export const TimeDisplay = styled.div`
  display: flex;

  * {
    margin-right: 20px;
  }
`;

export const Tab = styled.div`
  display: flex;
  align-items: center;
  margin-right: -50px;
  padding: 0 20px;
  background: ${(props) => props.theme.appPrimary};
  border-radius: 30px 0 0 30px;
  height: 50%;
`;
