import React from 'react';
import { motion } from 'framer-motion';

type OptionProgressTypes = {
  title: string;
  votes: number;
  percentage: number;
  layoutId: string | number;
};

const OptionProgress: React.FC<OptionProgressTypes> = ({
  title,
  votes,
  percentage,
  layoutId,
}) => {
  return (
    <motion.div
      key={layoutId}
      layoutId={layoutId.toString()}
      className="p-6 bg-white shadow-lg rounded-md  text-gray-800">
      <div className="w-full flex mb-3">
        <span className="text-xl font-bold">{title}</span>
        <span className="ml-auto text-xl font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-3 rounded-md bg-gray-200 mb-3 overflow-hidden">
        <div
          className="h-3 rounded-md bg-dankPurple opacity-60 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-indigo-500">{votes} Votes</span>
    </motion.div>
  );
};

export default OptionProgress;
