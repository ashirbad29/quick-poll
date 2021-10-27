import { useState } from 'react';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

// eslint-disable-next-line import/prefer-default-export
export const usePoll = (pollId: string) => {
  const [pollData, setPollData] = useState<DocumentData>();

  const pollRef = doc(db, 'polls', pollId);
  onSnapshot(pollRef, (poll) => {
    setPollData(poll.data());
  });

  return pollData;
};
