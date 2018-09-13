import { css } from 'styled-components';

export const flexCenterMixin = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const containerMixin = css`
  ${flexCenterMixin}
  flex-grow: 2;
`;
