import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { PollTypes } from '../interfaces';

const useRealtimePoll = (id: string) => {
  const [poll, setPoll] = useState<PollTypes | null>(null);
  const [isExists, setIsExists] = useState<boolean>(true);

  useEffect(() => {
    const docRef = doc(db, 'polls', id);
    const unSub = onSnapshot(docRef, (pollData) => {
      if (!pollData.exists()) {
        setIsExists(false);
      } else {
        setPoll(pollData.data() as PollTypes);
      }
    });

    return () => {
      unSub();
    };
  }, [id]);

  return [poll, isExists] as const;
};

export default useRealtimePoll;
