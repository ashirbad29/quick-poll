import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../Hooks/useLocalStorage';
// import getAllPolls from '../../services/getPolls';
import { PollTypes } from '../../interfaces';
import { myLog } from '../../utils';
import Spinner from '../../components/Spinner';
// import mockApi from '../../utils/mockApi';
import DoesNotExists from '../../components/DoesNotExists';

const History = () => {
  const [userPolls, setUserPolls] = useState<PollTypes[]>();
  const [userVotes] = useLocalStorage<{ poll_id: string; opt_id: number }[]>(
    'user_votes',
    [],
  );

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        // const pollsData = await getAllPolls();
        // const filteredData = pollsData.filter((poll) =>
        //   userVotes.some((o) => o.poll_id === poll.id),
        // );
        // const filteredData = await mockApi();
        setUserPolls([]);
      } catch (e: any) {
        myLog(e.message);
        throw new Error(e.message);
      }
    };

    fetchPolls();
  }, [userVotes]);

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
        <DoesNotExists message="Such Empty" />
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
      <div className="max-w-5xl mx-auto mt-9 px-4 mb-9">
        <h1 className="text-gray-800 font-bold text-xl max-w-prose">
          Polls you&#39;ve created recently
        </h1>
        <p>{JSON.stringify(userPolls)}</p>
      </div>
    </div>
  );
};

export default History;
