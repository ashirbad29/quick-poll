export interface PollTypes {
  question: string;
  options: { title: string; votes: number }[];
  totalVotes: number;
  key: string;
}
