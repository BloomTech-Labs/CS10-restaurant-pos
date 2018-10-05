import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;
