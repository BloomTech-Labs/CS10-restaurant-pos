import React from 'react';
import PropTypes from 'prop-types';

export default function CategorySelector(props) {
  const { selected, categories, filter } = props;
  return (
    <div>
      {categories.map(category => (
        <div selected={selected === category} onClick={() => filter(category)}>
          {category}
        </div>
      ))}
    </div>
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
