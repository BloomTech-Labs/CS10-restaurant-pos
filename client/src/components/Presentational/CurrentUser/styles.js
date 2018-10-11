import styled from 'styled-components';

import { flexCenterMixin } from '../../../global-styles/mixins';

export const Container = styled.div`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const ProfilePic = styled.div`
  ${flexCenterMixin};
  border-radius: 50%;
  background: grey;
  height: 55px;
  width: 55px;
  overflow: hidden;

  > img {
    margin: 0;
  }
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
