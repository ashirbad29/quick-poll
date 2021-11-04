import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { DeleteIcon } from '../../../assets/Icons';

type PropTypes = {
  question: string;
  votes: number;
  id: string;
  deletePoll: () => void;
};

const PollHistoryCard: React.FC<PropTypes> = ({ question, votes, id, deletePoll }) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div className="relative">
      <Link
        to={`/poll/${id}`}
        className={clsx(
          'py-4 px-6 flex flex-col bg-white shadow-lg rounded-md border-2 transition-all hover:shadow-xl hover:border-dankPurple',
          { '!border-red-400': mouseEnter },
        )}>
        <span className="text-gray-800 text-xl font-semibold">{question}</span>
        <span className="mt-2 font-medium text-green-500">
          Total {votes} votes received
        </span>
      </Link>
      <DeleteIcon
        className="w-6 h-6 absolute top-4 right-4 z-10 cursor-pointer hover:text-gray-700"
        onClick={deletePoll}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      />
    </div>
  );
};

export default PollHistoryCard;
