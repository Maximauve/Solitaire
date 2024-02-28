import { type CardType, Symbol } from '@/types/Card';
import { CardValue } from '@/constants/Card';

export const initGame = () => {
  const cards = getCards();
  const shuffledCards = shuffle(cards);
  return shuffledCards;
}

// export const initGame = () => {
//   const cards = getCards();
//   return cards;
// }


const getCards = (): CardType[] => {
  const cards: CardType[] = [];
  const symbols = [Symbol.SPADE, Symbol.HEART, Symbol.DIAMOND, Symbol.CLUB];
  symbols.forEach((symbol) => {
    CardValue.forEach((value) => {
      cards.push({ symbol, value, hidden: true });
    });
  });
  return cards;
}

const shuffle = (cards: CardType[]): CardType[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const sleep = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const canStackOn = (from: CardType, to: CardType): boolean => {
  const fromPower = CardValue.indexOf(from.value);
  const toPower = CardValue.indexOf(to.value);
  const colors = {
    red: [Symbol.HEART, Symbol.DIAMOND],
    black: [Symbol.SPADE, Symbol.CLUB]
  }
  if (fromPower !== toPower - 1) {
    return false;
  }
  if (colors.red.includes(from.symbol) && colors.red.includes(to.symbol)) {
    return false;
  }
  if (colors.black.includes(from.symbol) && colors.black.includes(to.symbol)) {
    return false;
  }
  return true;
}

export const canStackInPlaceHolder = (from: CardType, to: CardType): boolean => {
  if (from.symbol !== to.symbol) {
    return false;
  }
  const fromPower = CardValue.indexOf(from.value);
  const toPower = CardValue.indexOf(to.value);

  if (fromPower !== toPower + 1) {
    return false;
  }
  return true;
}

export const isGameWon = (placeholder: { [key in Symbol]: CardType[] }) => {
  return Object.values(placeholder).every((cards) => cards.length === 13);
}

export const canQuickWin = (gameCards: CardType[][], deck: CardType[], deckDisplay: CardType[]) => {
  if (deck.length === 0 && deckDisplay.length === 0) {
    return gameCards.every((cards) => cards.every((card) => !card.hidden));
  }
  return false;
}