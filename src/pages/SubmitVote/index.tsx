import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';

import Option from './components/Options';
import { ChevronRight } from '../../assets/Icons';
import useLocalStorage from '../../Hooks/useLocalStorage';

import useRealtimePoll from '../../services/getRealtimePoll';
import pollTransaction from '../../services/pollTransaction';
import myLog from '../../utils/myLog';
import DoesNotExists from '../../components/DoesNotExists';

const SubmitVote = () => {
  const [selectedOption, setSelectedOption] = useState(-1);
  const [voteCasted, setVoteCasted] = useState(false);
  const [userVotes, setUserVotes] = useLocalStorage<
    { poll_id: string; opt_id: number }[]
  >('user_votes', []);

  const { id: pollId } = useParams<{ id: string }>();

  useEffect(() => {
    const vote = userVotes.find((v) => v.poll_id === pollId);
    if (vote) {
      setVoteCasted(true);
      setSelectedOption(vote.opt_id);
    }
  }, [pollId, userVotes]);

  const [poll, isPollExists] = useRealtimePoll(pollId);

  const handleVote = async (id: number) => {
    if (voteCasted) {
      toast.error('Already Voted');
      return;
    }
    if (id === -1) {
      toast.error('select a option');
      return;
    }

    toast.promise(pollTransaction(pollId, id), {
      success: () => {
        setUserVotes([...userVotes, { poll_id: pollId, opt_id: id }]);
        return `Your vote submitted`;
      },
      loading: 'Adding your vote...',
      error: (err) => {
        myLog(err.message);
        return 'Unable to submit, try again';
      },
    });
  };

  if (!isPollExists) {
    return <DoesNotExists message="Poll Not Found" />;
  }

  if (!poll && isPollExists) {
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
          {poll?.options.map((option) => (
            <Option
              key={option.opt_id}
              title={option.title}
              isSelected={option.opt_id === selectedOption}
              disabled={voteCasted}
              onSelect={() => setSelectedOption(option.opt_id)}
            />
          ))}
        </div>

        <div className="mt-8 w-full flex gap-3">
          <button
            type="button"
            onClick={() => handleVote(selectedOption)}
            disabled={voteCasted}
            className="bg-green-500 relative px-6 py-2 text-white text-sm sm:text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed">
            <span>Submit your Vote</span>
            {false && (
              <span className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md">
                <Spinner height="20px" width="20px" />{' '}
              </span>
            )}
          </button>
          <Link to={`/poll/result/${pollId}`} className="ml-auto">
            <div className="relative inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border-2 border-gray-200 text-sm sm:text-lg leading-6 font-medium rounded-md text-gray-500 bg-white hover:text-purple-700 focus:border-purple-300 transition ease-in-out duration-150">
                View Results
                <span>
                  <ChevronRight className="h-6 w-6 text-gray-500 ml-2" />
                </span>
              </button>
              {voteCasted && (
                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500" />
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubmitVote;
