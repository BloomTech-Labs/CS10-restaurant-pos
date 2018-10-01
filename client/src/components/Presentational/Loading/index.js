import React from 'react';

import * as s from './styles';

export default function Loading() {
  return (
    <s.Container>
      <s.Wave>
        <s.Dot />
        <s.Dot />
        <s.Dot />
      </s.Wave>
    </s.Container>
  );
}
