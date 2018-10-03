import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${flexCenterMixin}
  width: 100%;
  padding: 30px;
`;

export const Selector = styled.div`
  display: flex;
  background: ${(props) => props.theme.menuBg};
  border-radius: ${(props) => props.theme.catMenuBorderRadius}px;
  color: ${(props) => props.theme.lightText};
  padding: 8px;
`;

export const Category = styled.div`
  background: ${(props) => (props.selected ? 'white' : 'none')};
  border-radius: ${(props) => props.theme.categoryBorderRadius}px;
  color: ${(props) => (props.selected ? props.theme.primaryText : props.theme.lightText)};
  padding: 12px 15px;

  &:hover {
    cursor: pointer;
  }
`;
