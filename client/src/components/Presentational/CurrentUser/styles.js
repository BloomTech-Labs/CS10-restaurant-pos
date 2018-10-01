import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const ProfilePic = styled.div`
  border-radius: 50%;
  background: grey;
  height: 55px;
  width: 55px;
`;
