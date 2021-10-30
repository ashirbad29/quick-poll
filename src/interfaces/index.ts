export interface PollTypes {
  id?: string;
  question: string;
  options: { title: string; votes: number; opt_id: number }[];
  totalVotes: number;
  key: string;
}
