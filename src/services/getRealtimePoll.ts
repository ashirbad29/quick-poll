import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { PollTypes } from '../interfaces';

const useRealtimePoll = (id: string) => {
  const [poll, setPoll] = useState<PollTypes>();

  useEffect(() => {
    const docRef = doc(db, 'polls', id);
    const unSub = onSnapshot(docRef, (pollData) => {
      setPoll(pollData.data() as PollTypes);
    });

    return () => {
      unSub();
    };
  }, [id]);

  return [poll] as const;
};

export default useRealtimePoll;
