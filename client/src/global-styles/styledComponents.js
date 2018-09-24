/* stylelint-disable value-list-max-empty-lines */
/* stylelint-disable declaration-colon-newline-after */
import styled from 'styled-components';

import { flexCenterMixin } from './mixins';

export const MainContainer = styled.div`
  background: ${(props) => props.theme.contentBackground};
  border-radius: 50px 0 0 0;
  overflow: hidden;
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

export const Button = styled.button`
  ${flexCenterMixin};
  padding: 0;
  font-weight: 600;
  letter-spacing: 2px;
  color: ${(props) => {
    if (!props.primary && !props.dark) {
      return props.theme.btnPrimaryBgColor;
    }
    return props.theme.btnTextColor;
  }};
  font-size: ${(props) => props.theme.btnFontSize}rem;
  width: ${(props) => props.theme.btnWidth}px;
  height: ${(props) => props.theme.btnHeight}px;
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  ${(props) => {
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
  background: ${(props) => {
    if (props.primary && props.dark) {
      return props.theme.btnDarkPrimaryBgColor;
    }
    if (props.primary) {
      return props.theme.btnPrimaryBgColor;
    }
    return props.theme.btnBgColor;
  }};

  &:hover {
    cursor: pointer;
    margin-bottom: 2px;
    box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.1);
  }
`;
