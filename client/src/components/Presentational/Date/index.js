import React from 'react';
import format from 'date-fns/format';

import * as s from './styles';

export default function DateDisplay() {
  const today = new Date();

  return (
    <s.Container>
      <h2>{format(today, 'ddd M/DD/YYYY')}</h2>
    </s.Container>
  );
}
