export interface PollOption {
  text: string;
  votes: number;
}


export interface UserVote {
  uid: string;
  optionIndex: number;
}


export interface Poll {
  id: string;

  question: string;

  options: PollOption[];

  votes: UserVote[];

  ownerId: string;

  ownerEmail: string;

  status?: "open" | "closed";

  ownerName: string;

  createdAt?: string;

  createdBy?: string;
}