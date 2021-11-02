import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimateSharedLayout } from 'framer-motion';
import OptionProgress from './components/OptionProgress';
import useLocalStorage from '../../Hooks/useLocalStorage';
import Spinner from '../../components/Spinner';

import { TwitterIcon, WhatsAppIcon } from '../../assets/brandIcons';

import useRealtimePoll from '../../services/getRealtimePoll';
import DoesNotExists from '../../components/DoesNotExists';

const PollResults = () => {
  const { id: pollId } = useParams<{ id: string }>();
  const [userOption, setUserOption] = useState<string | undefined>(undefined);
  const [userVotes] = useLocalStorage<{ poll_id: string; opt_id: number }[]>(
    'user_votes',
    [],
  );

  const [poll, isPollExists] = useRealtimePoll(pollId);

  useEffect(() => {
    const vote = userVotes.find((v) => v.poll_id === pollId);
    if (vote) {
      const option = poll?.options.find((opt) => opt.opt_id === vote.opt_id);
      setUserOption(option?.title);
    }
  }, [pollId, userVotes, poll?.options]);

  const getPercentage = (x: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((x / total) * 100);
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
    <div className="bg-gray-100 flex-1">
      <div className="max-w-5xl mx-auto mt-9 px-4 mb-52 md:mb-9">
        <h1 className="text-gray-800 font-bold text-3xl max-w-prose">{poll?.question}</h1>
        <div className="mt-8 flex flex-col md:flex-row">
          <div className="flex flex-col gap-6 w-full md:w-2/3">
            <AnimateSharedLayout>
              {poll?.options
                .sort((a, b) => b.votes - a.votes)
                .map((opt) => (
                  <OptionProgress
                    key={opt.opt_id}
                    layoutId={opt.opt_id || ''}
                    title={opt.title}
                    votes={opt.votes}
                    percentage={getPercentage(opt.votes, poll.totalVotes)}
                  />
                ))}
            </AnimateSharedLayout>
          </div>
          <div className="w-full fixed bottom-0 left-0 bg-white flex flex-col-reverse p-4 mt-9 md:mt-0 md:ml-16 md:w-1/3 md:static md:flex-col md:bg-transparent">
            {userOption ? (
              <div className="px-4 py-2 text-center md:text-left rounded-md bg-blue-200">
                You voted <span className="font-medium ">{userOption}</span> on this poll
              </div>
            ) : (
              <div>
                <Link to={`/poll/${pollId}`} className="px-4 py-2 bg-green-400 rounded">
                  Submit your vote
                </Link>
              </div>
            )}
            <div className="w-full bg-white pb-3 rounded-md md:mt-6 md:last:px-4 md:py-2 shadow-sm flex md:flex-col">
              <div className="w-full flex flex-col">
                <span className="font-semibold text-gray-500">Total Votes</span>
                <span className="text-2xl font-bold">{poll?.totalVotes}</span>
              </div>
              <div className="mt-3 flex md:flex-col gap-4">
                <a
                  href={encodeURI(
                    `https://twitter.com/intent/tweet?text=Vote on this pole&url=${window.location.href}`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="px-4 py-2 flex gap-3 items-center text-white bg-blue-500 rounded-md transition-all hover:bg-blue-400">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="hidden md:inline-block">Share on Twitter</span>
                </a>
                <a
                  href={encodeURI(
                    `https://api.whatsapp.com/send?text=Vote on this poll ${window.location.href}`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="px-4 py-2 flex gap-3 items-center text-white bg-green-500 rounded-md transition-all hover:bg-green-400">
                  <WhatsAppIcon className="h-5 w-5" />
                  <span className="hidden md:inline-block">Share on Whatsapp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollResults;
