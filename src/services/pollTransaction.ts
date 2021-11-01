import { doc, runTransaction, increment } from 'firebase/firestore';
import { db } from '../firebase';

const pollTransaction = async (id: string, opt_id: number) => {
  const docRef = doc(db, 'polls', id);
  try {
    await runTransaction(db, async (transaction) => {
      const pollDoc = await transaction.get(docRef);
      if (!pollDoc.exists()) {
        throw new Error('Document Does not exists');
      }

      const options = pollDoc
        .data()
        .options.map((opt: any) =>
          opt.opt_id === opt_id ? { ...opt, votes: opt.votes + 1 } : opt,
        );

      transaction.update(docRef, { options, totalVotes: increment(1) });
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default pollTransaction;
