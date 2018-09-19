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
  width: ${(props) => props.theme.btnWidth}px;
  height: ${(props) => props.theme.btnHeight}px;
`;
