import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { DeleteIcon } from '../../../assets/Icons';

type OptionInputTypes = {
  value: string;
  optionNumber: number;
  showDeleteBtn: boolean;
  onChange: (val: string) => void;
  onDelete: () => void;
  error: boolean;
};

const OptionInput: React.FC<OptionInputTypes> = ({
  optionNumber,
  onChange,
  onDelete,
  showDeleteBtn,
  value,
  error,
}) => {
  return (
    <motion.div layout className="my-2" exit={{ opacity: 0 }}>
      <h3 className="text-lg font-semibold text-gray-500 mb-1">Option {optionNumber}</h3>
      <div className="w-full flex gap-3 items-center">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Option ${optionNumber}`}
          className={clsx(
            'w-full p-2 text-lg outline-none focus:ring-2 ring-purple-300 rounded-md border placeholder-gray-300',
            { '!ring-4 !ring-red-300': error && !value.trim() },
          )}
        />
        {showDeleteBtn && (
          <DeleteIcon
            className="h-5 w-5 cursor-pointer text-red-500"
            onClick={() => onDelete()}
          />
        )}
      </div>
      {error && !value.trim() && (
        <span className="!mt-0 text-sm text-red-400 font-medium">
          This field can&#39;t be empty
        </span>
      )}
    </motion.div>
  );
};

export default React.memo(OptionInput);
