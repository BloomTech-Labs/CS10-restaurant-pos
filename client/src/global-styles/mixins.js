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

export const card = css`
  background: ${(props) => props.theme.appPrimary};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: ${(props) => props.theme.cardBorderRadius}px;
`;

export const checkbox = css`
  display: inline-block;

  > input {
    opacity: 0;
  }

  > input + label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 17px;
      height: 17px;
      border: 1px solid #aaa;
      background: #f8f8f8;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 15px;
      height: 15px;
      background: black;
      border-radius: 2px;
      transition: all 0.2s;
    }
  }

  > input:not(:checked) + label {
    &::after {
      opacity: 0;
      transform: scale(0);
    }
  }

  > input:checked + label {
    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }

  > input:disabled + label {
    color: #aaa;
  }

  > input:disabled:checked + label {
    &::after {
      color: #999;
    }
  }

  > input:disabled:not(:checked) + label {
    &::before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #ddd;
    }
  }
`;
