import { PollTypes } from '../interfaces';

const mockApi = async (delay: number = 1000) => {
  const data: PollTypes = {
    question: 'which is your favorite anime',
    options: [
      { title: 'Attack on Titan', votes: 137, opt_id: 1 },
      { title: 'Food Wars', votes: 113, opt_id: 2 },
      { title: 'Naruto Sipphuden', votes: 81, opt_id: 3 },
      { title: 'Naruto Sipphuden', votes: 57, opt_id: 4 },
    ],
    totalVotes: 388,
    key: 'asfdghr54v',
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as PollTypes);
    }, delay);
  });
};

export default mockApi;
