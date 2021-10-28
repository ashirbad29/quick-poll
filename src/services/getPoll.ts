import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PollTypes } from '../interfaces';

const getPoll = async (id: string) => {
  const docRef = doc(db, 'polls', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as PollTypes;
};

export default getPoll;
