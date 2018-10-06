import styled from 'styled-components';

import { MainContainer } from '../../../global-styles/styledComponents';
import { containerMixin, modalBlur } from '../../../global-styles/mixins';

export const Container = styled(MainContainer)`
  ${containerMixin};
  flex-wrap: wrap;
  overflow-y: auto;
  ${(props) => props.modalOpen && modalBlur};
`;

export const CardContainer = styled.div`
  border: 3px solid green;
  display: flex;
  justify-content: center;
  flex-direction: wrap;
  width: 100%;
`;
