import React from 'react';
import { useParams, Link } from 'react-router-dom';

import toast from 'react-hot-toast';

const ORIGIN = window.location.origin;

const PollCreated = () => {
  const { id: pollId } = useParams<{ id: string }>();
  const POLL_URL = `${ORIGIN}/poll/${pollId}`;

  const copyToClipboard = async (text: string) => {
    toast.promise(window.navigator.clipboard.writeText(text), {
      loading: '...',
      success: 'copied to clipboard',
      error: 'oops.. some error occured',
    });
  };

  return (
    <div className="bg-gray-100 flex-1 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-md border px-8 pt-8 pb-3 shadow-md">
        <div className="font-medium">
          The Link to your poll{' '}
          <span role="img" aria-label="below">
            👇
          </span>
        </div>
        <input
          className="w-full bg-gray-100 p-2 my-2 border rounded cursor-pointer transition-all focus:outline-none text-gray-600 hover:bg-gray-200"
          type="text"
          readOnly
          value={POLL_URL}
          onClick={() => copyToClipboard(POLL_URL)}
        />

        <div className="font-medium mt-5">
          The Admin Link to manage your poll{' '}
          <span role="img" aria-label="below">
            🔒
          </span>
          <div className="relative border rounded p-2 bg-gray-100 mt-2 cursor-pointer transition-all hover:bg-gray-200">
            <input
              type="text"
              className="w-full bg-transparent text-gray-200"
              readOnly
              value={POLL_URL}
            />
            {/* eslint-disable jsx-a11y/no-static-element-interactions */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              className="absolute inset-0 text-center flex items-center justify-center font-bold text-gray-600"
              onClick={() => copyToClipboard(POLL_URL)}>
              Click to copy
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end mt-4 gap-6">
          <Link
            className="font-bold block text-purple-400 hover:text-purple-500 w-max"
            to={`/poll/${pollId}`}>
            Visit your poll
          </Link>
          <Link
            className="font-bold block text-purple-400 hover:text-purple-500 w-max"
            to={`/poll/${pollId}/admin`}>
            Visit admin page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PollCreated;
