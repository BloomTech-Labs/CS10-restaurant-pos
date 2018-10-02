import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export const Selector = styled.div`
  display: flex;
  background: ${(props) => props.theme.menuBg};
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  padding: 10px;
`;

export const Category = styled.div`
  background: ${(props) => (props.selected ? 'white' : 'none')};
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  padding: 5px;

  &:hover {
    cursor: pointer;
  }
`;
