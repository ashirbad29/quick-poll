import React from 'react';
import { DeleteIcon } from '../../../assets/Icons';

type OptionInputTypes = {
  optionNumber: number;
  showDeleteBtn: boolean;
  onChange: (val: string) => void;
  onDelete: () => void;
};

const OptionInput: React.FC<OptionInputTypes> = ({
  optionNumber,
  onChange,
  onDelete,
  showDeleteBtn,
}) => {
  return (
    <div className="my-2">
      <h3 className="text-lg font-semibold text-gray-500 mb-1">Option {optionNumber}</h3>
      <div className="w-full flex gap-3 items-center">
        <input
          type="text"
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Option ${optionNumber}`}
          className="w-full p-2 text-lg outline-none focus:ring-2 ring-purple-300 rounded-md border placeholder-gray-300"
        />
        {showDeleteBtn && (
          <DeleteIcon
            className="h-5 w-5 cursor-pointer text-red-500"
            onClick={() => onDelete()}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(OptionInput);
