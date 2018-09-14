import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  border: 2px solid purple;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 100%;
`;

export const Boxes = styled.div`
  border: 2px solid red;
  display: flex;
  align-items: center;
  height: 75px;
  margin: 7px;
  padding: 15px;
`;

export const Items = styled.span`
  border: 1px solid black;
`;

export const DeleteButton = styled.div`
  ${flexCenterMixin};
  cursor: pointer;
  background: grey;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;
