import styled from 'styled-components';

export const Container = styled.div`
  color: ${(props) => props.theme.btnPrimaryBgColor};
  font-weight: 700;
`;

export const Select = styled.select`
  font-weight: 600;
  font-size: ${(props) => props.theme.btnFontSize}rem;
  width: ${(props) => props.theme.btnWidth}px;
  height: calc(${(props) => props.theme.btnHeight}px - 10px);
  border-radius: ${(props) => props.theme.btnBorderRadius}px;
  background: ${(props) => props.theme.appPrimary};
  margin: 12px 0 0 0;
  padding: 0 10px;
  transition: background 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.contentBackground};
  }
`;
