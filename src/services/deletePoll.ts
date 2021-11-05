import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const deletePoll = async (id: string) => {
  const docRef = doc(db, 'polls', id);
  await deleteDoc(docRef);
};

export default deletePoll;
