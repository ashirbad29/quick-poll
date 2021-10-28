export interface PollTypes {
  id?: string;
  question: string;
  options: { title: string; votes: number }[];
  totalVotes: number;
  key: string;
}
