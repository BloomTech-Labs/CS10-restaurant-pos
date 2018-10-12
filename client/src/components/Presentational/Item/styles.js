import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';
import { Boxes } from '../../../global-styles/styledComponents';

export const ItemBoxes = styled(Boxes)`
  padding-top: 0;
  position: relative;

  &:hover {
    ${(props) => props.noHover && 'transform: none;'};
  }
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 10px 10px;
  flex-grow: 1;
`;

export const ItemPic = styled.div`
  ${flexCenterMixin};
  background: ${(props) => props.theme.lightText};
  height: 120px;
  width: 100%;
  overflow: hidden;
  border-radius: ${(props) => `${props.theme.cardBorderRadius}px ${props.theme.cardBorderRadius}px 0 0`};
  padding-top: ${(props) => (props.defaultImage ? '40px' : '0px')};
`;

export const ItemTitle = styled.div`
  ${flexCenterMixin};
  flex-grow: 1;
  font-size: ${(props) => props.theme.ItemTitleSize}rem;
`;

export const ItemPrice = styled.div`
  ${flexCenterMixin};
  font-weight: 300;
  font-size: ${(props) => props.theme.ItemPriceSize}rem;
`;

export const PriceContainer = styled.div`
  ${flexCenterMixin};
  width: 100%;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const DropDownDots = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 50px;
  width: 40px;
  top: 0;
  right: 0;
  background: white;
  border-radius: 0 ${(props) => props.theme.cardBorderRadius}px 0 ${(props) => props.theme.cardBorderRadius}px;

  * {
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background: ${(props) => props.theme.lightText};
    margin-bottom: 2px;
  }

  &:hover {
    * {
      background: black;
    }
  }
`;

export const DropDownDisplay = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  margin-left: 95%;
  overflow: hidden;
  background: ${(props) => props.theme.appPrimary};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  visibility: ${(props) => !props.show && 'hidden'};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    cursor: default;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: ${(props) => !props.show && 'none'};
`;

export const Option = styled.div`
  ${flexCenterMixin};
  padding: 10px;
  width: 200px;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.lightText};
  }
`;
