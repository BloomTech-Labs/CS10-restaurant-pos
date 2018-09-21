import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
  width: 100%;
`;

export const Boxes = styled.div`
  ${flexCenterMixin};
  flex-direction: column;
  justify-content: flex-start;
  background: ${(props) => props.theme.appPrimary};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  align-items: center;
  height: ${(props) => props.theme.menuItemSize}px;
  width: ${(props) => props.theme.menuItemSize}px;
  margin: 10px;
  padding: 25px 0 0 0;
  cursor: pointer;
`;

export const Item = styled.div`
  padding-bottom: 5px;
`;

export const ItemTitle = styled(Item)`
  font-size: ${(props) => props.theme.ItemTitleSize}rem;
`;

export const ItemDescription = styled(Item)`
  font-size: ${(props) => props.theme.ItemTitlePrice}rem;
`;

export const ItemPrice = styled(Item)`
  font-size: ${(props) => props.theme.ItemTitleSize}rem;
`;
