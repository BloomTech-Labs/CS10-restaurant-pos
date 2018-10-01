import React from 'react';
import format from 'date-fns/format';

export default function DateDisplay() {
  const today = new Date();

  return (
    <div>
      <h2>{format(today, 'ddd M/DD/YYYY')}</h2>
    </div>
  );
}
