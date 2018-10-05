import styled from 'styled-components';

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-size: 2rem;
  width: 100%;
`;

export const subHeader = styled.h1`
  font-size: ${(props) => props.theme.h1}rem;
  margin-bottom: 5px;
`;

export const TablesDisplay = styled.div`
  color: ${(props) => props.theme.medText};
  font-size: ${(props) => props.theme.btnFontSize}rem;
  font-weight: 300;
`;
