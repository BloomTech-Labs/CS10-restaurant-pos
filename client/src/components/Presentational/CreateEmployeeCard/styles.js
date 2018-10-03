import styled from 'styled-components';

import { containerMixin, card, flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  ${containerMixin};
  flex-direction: column;
`;

export const Form = styled.form`
  ${flexCenterMixin};
  flex-direction: column;
  margin: 35px;
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
`;
