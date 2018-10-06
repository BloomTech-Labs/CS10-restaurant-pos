import styled from 'styled-components';

import { containerMixin, card, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${containerMixin};
  flex-direction: column;
  border: 3px solid green;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  ${flexCenterMixin};
  ${card};
  flex-direction: column;
  justify-content: space-evenly;
  height: ${(props) => props.theme.settingCardHeight}px;
  max-width: ${(props) => props.theme.settingCardMaxWidth}px;
  padding: ${(props) => props.theme.settingCardPadding};
  margin: ${(props) => props.theme.settingCardMargin};
  border: 3px solid red;
`;
