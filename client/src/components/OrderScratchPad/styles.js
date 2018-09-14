import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Items = styled.div`
  border: 2px solid red;
  display: flex;
  align-items: center;
  height: 75px;
  margin: 7px;
  padding: 15px;
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

export const SubTotal = styled.div`
  ${flexCenterMixin};
  height: 10%;
`;

export const Scroll = styled.div`
  border: 2px solid purple;
  display: inline-block;
  width: 300px;
  height: 90%
  overflow-y: scroll;
`;
