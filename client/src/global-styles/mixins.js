import { css } from 'styled-components';

export const flexCenterMixin = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const containerMixin = css`
  display: flex;
  flex-grow: 2;
`;

export const modalBlur = css`
  filter: blur(1px);
`;

export const buttonMixin = css`
  ${flexCenterMixin};
  color: ${(props) => props.theme.btnColor};
  font-size: ${(props) => props.theme.btnFontSize}rem;
  width: ${(props) => props.theme.btnWidth}px;
  height: ${(props) => props.theme.btnHeight}px;
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  background: ${(props) => (props.main ? props.theme.btnMainBgColor : props.theme.btnBgColor)};
`;
