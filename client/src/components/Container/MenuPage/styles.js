import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';

export const Container = styled(MainContainer)`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  width: 100%;
  padding: 0;
`;

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;
