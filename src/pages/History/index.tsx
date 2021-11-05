import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useLocalStorage from '../../Hooks/useLocalStorage';
import getAllPolls from '../../services/getPolls';
import { PollTypes } from '../../interfaces';
import { myLog } from '../../utils';
import Spinner from '../../components/Spinner';
import DoesNotExists from '../../components/DoesNotExists';
import PollHistoryCard from './components/PollHistoryCard';
import deletePoll from '../../services/deletePoll';

const History = () => {
  const [userPolls, setUserPolls] = useState<PollTypes[]>();
  const [userPollsLocal, setUserPollsLocal] = useLocalStorage<string[]>('user_polls', []);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const pollsData = await getAllPolls();
        const filteredData = pollsData.filter((poll) =>
          userPollsLocal.some((poll_id) => poll_id === poll.id),
        );
        setUserPolls(filteredData as PollTypes[]);
      } catch (e: any) {
        myLog(e.message);
        throw new Error(e.message);
      }
    };

    fetchPolls();
  }, [userPollsLocal]);

  const deletePollLocal = (id: string) => {
    toast.promise(deletePoll(id), {
      success: () => {
        setUserPollsLocal((local_polls) =>
          local_polls.filter((poll_id) => poll_id !== id),
        );
        return 'Poll deleted successfuly';
      },
      loading: 'Deleting poll...',
      error: (err) => {
        myLog(err.message);
        return 'Something went wrong';
      },
    });
  };

  if (!userPolls) {
    return (
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <Spinner height="28px" width="28px" />
      </div>
    );
  }

  if (userPolls?.length === 0) {
    return (
      <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center">
        <DoesNotExists message="Wow Such Empty!" />
        <div className="flex-1">
          <Link
            to="/"
            className="bg-dankPurple px-6 py-2 text-white text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90">
            Create a Poll
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100">
      <div className="max-w-2xl mx-auto mt-9 px-4 mb-9">
        <h1 className="text-gray-800 font-bold text-2xl max-w-prose">
          Polls you&#39;ve created recently
        </h1>
        <div className="mt-5 flex flex-col gap-6">
          {userPolls.map((poll) => (
            <PollHistoryCard
              key={poll.id}
              id={poll.id || ''}
              question={poll.question}
              votes={poll.totalVotes}
              deletePoll={() => deletePollLocal(poll.id || '')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
