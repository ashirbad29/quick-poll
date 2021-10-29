import React from 'react';
import Spinner from '../../components/Spinner';

const LivePoll = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <button type="button" className="flex p-2" disabled>
        <Spinner height="28px" width="28px" />
      </button>
    </div>
  );
};

export default LivePoll;
