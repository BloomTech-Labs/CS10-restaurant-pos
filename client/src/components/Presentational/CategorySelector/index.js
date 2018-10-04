import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import * as s from './styles';

export default function CategorySelector(props) {
  const { selected, categories, filter } = props;
  return (
    <s.Container>
      <s.Selector>
        {categories.map((category) => (
          <s.Category
            key={shortid.generate()}
            selected={selected === category}
            onClick={() => filter(category)}
          >
            {category}
          </s.Category>
        ))}
      </s.Selector>
    </s.Container>
  );
}

CategorySelector.propTypes = {
  selected: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  filter: PropTypes.func
};

CategorySelector.defaultProps = {
  selected: 'All',
  categories: ['All'],
  filter: () => {}
};
