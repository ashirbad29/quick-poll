import React from 'react';

const Option = (props: { title: string; isSelected: boolean }) => {
  const { title, isSelected } = props;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Option;
