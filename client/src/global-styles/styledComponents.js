/* stylelint-disable value-list-max-empty-lines */
/* stylelint-disable declaration-colon-newline-after */
import styled from 'styled-components';

import { flexCenterMixin } from './mixins';

export const Button = styled.button`
  ${flexCenterMixin};
  padding: 0;
  font-family: Nunito, sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
  color:
  ${props => {
    if (!props.primary && !props.dark) {
      return props.theme.btnPrimaryBgColor;
    }
    return props.theme.btnTextColor;
  }};
  font-size: ${props => props.theme.btnFontSize}rem;
  width: ${props => props.theme.btnWidth}px;
  height: ${props => props.theme.btnHeight}px;
  border-radius: ${props => props.theme.btnBorderRadius}px;
  ${props => {
    let color = '';
    if (!props.primary && props.dark) {
      color = props.theme.btnDarkBorderColor;
    } else if (!props.primary) {
      color = props.theme.btnBorderColor;
    } else {
      return 'border: 0';
    }
    return `border: 2px solid ${color}`;
  }};
  background:
  ${props => {
    if (props.primary && props.dark) {
      return props.theme.btnDarkPrimaryBgColor;
    }
    if (props.primary) {
      return props.theme.btnPrimaryBgColor;
    }
    return props.theme.btnBgColor;
  }};
`;
