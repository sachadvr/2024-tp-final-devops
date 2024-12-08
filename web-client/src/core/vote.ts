export const availableVoteTypes = [
  "heart",
  "thumbUp",
  "thumbDown",
  "star",
  "sleeping",
] as const;

export type Vote = (typeof availableVoteTypes)[number];
