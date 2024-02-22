export enum Symbol {
  SPADE = "spade",
  HEART = "heart",
  DIAMOND = "diamond",
  CLUB = "club"
};

export interface CardValueType {
  [key: number]: string
}