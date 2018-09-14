import styled from 'styled-components';

import { flexCenterMixin } from '../../global-styles/mixins';

export const Container = styled.div`
  border: 2px solid teal;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
`;

export const Boxes = styled.div`
  border: 2px solid red;
  ${flexCenterMixin}
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  width: 150px;
  margin: 7px;
  padding: 15px;
  cursor: pointer;
`;

export const Items = styled.div`
  border: 1px solid black;
`;
