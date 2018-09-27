import styled from 'styled-components';

import { modalBlur } from '../../../global-styles/mixins';
import { MainContainer } from '../../../global-styles/styledComponents';

export const Container = styled(MainContainer)`
  display: flex;
  flex-direction: row;
  flex-grow: 2;
  width: 100%;
  ${(props) => props.modalOpen && modalBlur};
`;
