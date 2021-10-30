import React from 'react';
import clsx from 'clsx';

const Option = (props: { title: string; isSelected: boolean; onSelect: () => any }) => {
  const { title, isSelected, onSelect } = props;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        'w-full flex items-center bg-white rounded-md px-6 py-4 border-2 transition-all duration-300 hover:shadow-xl',
        { 'border-gray-100 shadow-lg': !isSelected },
        { ' border-dankPurple !border-opacity-50 !shadow-md -mr-2': isSelected },
      )}>
      <span
        className={clsx(
          'block h-5 w-5 rounded-full',
          { 'bg-dankPurple': isSelected },
          { 'border-2': !isSelected },
        )}
      />
      <h1 className="ml-9 text-lg sm:text-xl font-bold">{title}</h1>
    </button>
  );
};

export default Option;
