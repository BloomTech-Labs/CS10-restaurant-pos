import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 60px;
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

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70%;
  margin-right: 15px;
`;

export const Role = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${(props) => props.theme.lightText};
  font-weight: 300;
`;

export const Name = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.7rem;
  color: ${(props) => props.theme.primaryText};
`;
