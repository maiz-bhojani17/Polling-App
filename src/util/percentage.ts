export const calculatePercentage = (
  votes: number,
  totalVotes: number
) => {
  if (totalVotes === 0) return 0;

  return Math.round((votes / totalVotes) * 100);
};