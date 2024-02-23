export enum Symbol {
  SPADE = "spade",
  HEART = "heart",
  DIAMOND = "diamond",
  CLUB = "club"
};

export interface CardType {
  symbol: Symbol,
  value: string,
  hidden?: boolean,
  active?: boolean
}