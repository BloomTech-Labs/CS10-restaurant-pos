/* ts-styled-plugin disable */
import styled from 'styled-components';

import { containerMixin, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${containerMixin};
  ${flexCenterMixin};
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
`;

export const Titles = styled.div`
  width: 90%;
  position: absolute;
  top: 20px;
`;

export const CardHalf = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: ${(props) => props.theme.settingCardMaxWidth}px;
  padding: ${(props) => props.theme.settingCardPadding};
  padding-top: 50px;
  position: relative;

  /* applies only to the left half, else it's 100% */
  height: ${(props) => (props.left ? `calc(${props.theme.settingCardHeight}px / 2)` : '100%')};

  /* applies only to the right half */
  ${(props) => props.right && 'border-left: 1.5px solid grey'};
`;

export const TextBox = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

export const ColorPickerButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin: -${(props) => props.theme.settingCardPadding};

  > button {
    margin: 10px 15px 0 15px;
  }
`;

export const ColorPickerBox = styled.div`
  position: absolute;
  left: -75%;
  bottom: 0;
`;
