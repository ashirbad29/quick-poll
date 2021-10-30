import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const updatePoll = async (id: string, data: any) => {
  const docRef = doc(db, 'polls', id);
  await updateDoc(docRef, data);
};

export default updatePoll;
