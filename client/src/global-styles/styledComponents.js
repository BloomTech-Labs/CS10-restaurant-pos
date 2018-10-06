/* stylelint-disable value-list-max-empty-lines */
/* stylelint-disable declaration-colon-newline-after */
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { flexCenterMixin, card } from './mixins';

export const MainContainer = styled.div`
  background: ${(props) => props.theme.contentBackground};
  border-radius: 50px 0 0 0;
  flex-grow: 2;
  width: 100%;
  padding:
    ${(props) => props.theme.mainContainerPaddingTopBottom}
    ${(props) => props.theme.mainContainerPaddingRightLeft};
  overflow: hidden;
`;

export const Boxes = styled.div`
  ${flexCenterMixin};
  ${card};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: ${(props) => props.theme.menuItemSize}px;
  width: ${(props) => props.theme.menuItemSize}px;
  margin: 10px;
  padding: 25px 0 0 0;
  transition: transform 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: translate(0, -3px);
  }
`;

export const Button = styled.button`
  ${flexCenterMixin};
  box-sizing: border-box;
  position: relative;
  padding: 0;
  font-weight: 600;
  flex-shrink: 0;
  z-index: 1;
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
  overflow: hidden;
  background: none;
  border: 0;
  transition: transform 0.1s ease-in-out;

  /* stylelint-disable comment-empty-line-before */
  &:hover {
    ${(props) => !props.inactive
      && `
      cursor: pointer;
      transform: translatey(-1px);
    `};
  }
  /* stylelint-enable comment-empty-line-before */

  &:active {
    transform: translate(0, 0);
    box-shadow: 0;
  }

  &::before {
    position: absolute;
    z-index: 10;
    content: '';
    background: rgba(0, 0, 0, 0.4);
    width: ${(props) => props.theme.btnWidth + 5}px;
    height: ${(props) => props.theme.btnHeight + 5}px;
    display: ${(props) => !props.inactive && 'none'};
  }

  &::after {
    position: absolute;
    z-index: -1;
    border-radius: ${(props) => props.theme.btnBorderRadius}px;
    width: ${(props) => props.theme.btnWidth - 4}px;
    height: ${(props) => props.theme.btnHeight - 4}px;
    content: '';
    background: ${(props) => {
    if (props.primary && props.dark) {
      return props.theme.btnDarkPrimaryBgColor;
    }
    if (props.primary) {
      return props.theme.btnPrimaryBgColor;
    }
    return props.theme.btnBgColor;
  }};
    ${(props) => {
    let color = '';
    if (props.inactive) {
      return 'border: 0';
    }

    if (!props.primary && props.dark) {
      color = props.theme.btnDarkBorderColor;
    } else if (!props.primary) {
      color = props.theme.btnBorderColor;
    } else {
      return 'border: 0';
    }
    return `border: 2px solid ${color}`;
  }};
  }
`;

export const StyledFormik = styled(Formik)`
  /* styles */
`;

export const StyledForm = styled(Form)`
  ${flexCenterMixin};
  ${card};
  flex-direction: column;
  justify-content: space-evenly;
  height: ${(props) => props.theme.settingCardHeight}px;
  max-width: ${(props) => props.theme.settingCardMaxWidth}px;
  padding: ${(props) => props.theme.settingCardPadding};
  margin: ${(props) => props.theme.settingCardMargin};
`;

export const StyledField = styled(Field)`
  background: ${(props) => (props.error ? props.theme.inputError : props.theme.contentBackground)};
  border: 0;
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  height: ${(props) => props.theme.btnHeight}px;
  font-size: ${(props) => props.theme.btnFontSize}rem;
  padding: 20px;
  width: 250px;

  &::placeholder {
    color: ${(props) => props.theme.placeholderColor};
  }

  &[type='number'] {
    -moz-appearance: textfield; /* stylelint-disable-line property-no-vendor-prefix */
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: ${(props) => props.theme.appSecondary};
  position: relative;
`;
