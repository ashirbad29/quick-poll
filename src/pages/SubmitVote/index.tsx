import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

import { PollTypes } from '../../interfaces';

import Option from './components/Options';
import { ChevronRight } from '../../assets/Icons';

const mockApi = async (delay: number = 1000) => {
  const data: PollTypes = {
    question: 'which is your favorite anime',
    options: [
      { title: 'Attack on Titan', votes: 0 },
      { title: 'Food Wars', votes: 0 },
      { title: 'Naruto Sipphuden', votes: 0 },
    ],
    totalVotes: 0,
    key: 'asfdghr54v',
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as PollTypes);
    }, delay);
  });
};

const SubmitVote = () => {
  const [loading, setLoading] = useState(false);
  const [poll, setPoll] = useState<PollTypes>();
  const [selectedOption, setSelectedOption] = useState(-1);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      const data = await mockApi(1000);
      setPoll(data as PollTypes);
      setLoading(false);
    };

    fetchPoll();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-100 flex-1 flex items-center justify-center">
        <Spinner height="28px" width="28px" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex-1 text-gray-800">
      <div className="w-full sm:w-11/12 max-w-3xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold">{poll?.question}</h2>
        <div className="mt-8 flex flex-col gap-5 items-center justify-center">
          {poll?.options.map((option, idx) => (
            <Option
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              title={option.title}
              isSelected={idx === selectedOption}
              onSelect={() => setSelectedOption(idx)}
            />
          ))}
        </div>

        <div className="mt-8 w-full flex gap-3">
          <button
            type="button"
            onClick={() => {}}
            className="bg-green-500 relative px-6 py-2 text-white text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90">
            <span>Submit your Vote</span>
            {false && (
              <span className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md">
                <Spinner height="20px" width="20px" />{' '}
              </span>
            )}
          </button>

          <div className="relative inline-flex rounded-md shadow-sm ml-auto">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border-2 border-gray-200 text-lg leading-6 font-medium rounded-md text-gray-500 bg-white hover:text-purple-700 focus:border-purple-300 transition ease-in-out duration-150">
              View Results
              <span>
                <ChevronRight className="h-6 w-6 text-gray-500 ml-2" />
              </span>
            </button>
            <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitVote;
