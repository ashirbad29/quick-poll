import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { PollTypes } from '../interfaces';

const getAllPolls = async () => {
  const querySnapshot = await getDocs(collection(db, 'polls'));
  const data = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return data as PollTypes[];
};

export default getAllPolls;
