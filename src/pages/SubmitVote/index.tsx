import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

import { PollTypes } from '../../interfaces';

import Option from './components/Options';

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
    <div className="bg-gray-100 flex-1 flex items-center justify-center">
      <div>
        <h2>{poll?.question}</h2>
        <div>
          {poll?.options.map((option, idx) => (
            <Option key={idx} title={option.title} isSelected={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmitVote;
