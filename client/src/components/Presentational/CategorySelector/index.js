import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function CategorySelector(props) {
  const { selected, categories, filter } = props;
  return (
    <s.Container>
      {categories.map(category => (
        <div selected={selected === category} onClick={() => filter(category)}>
          {category}
        </div>
      ))}
    </s.Container>
  );
}

CategorySelector.propTypes = {
  selected: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  filter: PropTypes.func,
};

CategorySelector.defaultProps = {
  selected: 'All',
  categories: ['All'],
  filter: () => {},
};
