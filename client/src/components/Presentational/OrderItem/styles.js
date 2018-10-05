import styled from 'styled-components';

export const Items = styled.div`
  display: flex;
  align-items: center;
  height: 55px;
  margin: 10px 0;
  padding: 5px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 2;
`;

export const Name = styled.span`
  /* 897sdf8asud */
`;

export const Price = styled.span`
  color: ${(props) => props.theme.lightTextOnDark};
  font-weight: 300;
`;
