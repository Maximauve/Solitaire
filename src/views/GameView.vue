<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Symbol, type CardType } from '@/types/Card';
import { CardValue } from '@/constants/Card';
import { canStackInPlaceHolder, canStackOn, initGame, sleep, isGameWon, canQuickWin } from '@/utils/GameUtils';
import { reactive, ref, onMounted, watchPostEffect, onBeforeMount, onBeforeUnmount } from 'vue';
import { useGameStore } from '@/stores/game';
import { onBeforeRouteLeave } from 'vue-router';
// import { DndProvider } from 'vue3-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

const { gameMode } = useGameStore();
const isQuickWin = ref(false);
const mounted = ref(false);
const deck = reactive<CardType[]>(initGame());
const deckDisplayed = reactive<CardType[]>([]);
const gameCards = reactive<CardType[][]>([[], [], [], [], [], [], []]);
const colorsPlaceholder = reactive<{ [key in Symbol]: CardType[] }>({
  [Symbol.HEART]: [],
  [Symbol.SPADE]: [],
  [Symbol.DIAMOND]: [],
  [Symbol.CLUB]: []
});

onBeforeMount(() => {
  window.addEventListener("beforeunload", preventLeave);
})

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", preventLeave);
})

onBeforeRouteLeave((_to, _from, next) => {
  if (!window.confirm('Are you sure you want to leave? Your game will be lost.')) {
    next(false);
  } else {
    next(true);
  }
})

const preventLeave = (event: Event) => {
  event.preventDefault();
}

watchPostEffect(() => {
  if (mounted.value && gameCards.some((col) => col.length !== 0)) {
    gameCards.forEach((col) => {
      if (col.length > 0) {
        col[col.length - 1].hidden = false;
      }
    })
  }
  if (mounted.value && canQuickWin(gameCards, deck, deckDisplayed)) {
    isQuickWin.value = true;
  }

  if (mounted.value && isGameWon(colorsPlaceholder)) {
    console.log('win');
  }
})

const getActive = (): [CardType | null, CardType[] | null] => {
  let activeCard: CardType | undefined = gameCards.flat().find((c) => c.active);
  if (!!activeCard) {
    const column = getColumn(activeCard);
    return [activeCard, column];
  }
  activeCard = deckDisplayed.find((c) => c.active);
  if (!!activeCard) {
    return [activeCard, deckDisplayed];
  }
  activeCard = Object.values(colorsPlaceholder).flat().find((c) => c.active);
  if (!!activeCard) {
    const column = getColumn(activeCard);
    return [activeCard, column];
  }
  return [null, null];
}

const getColumn = (card: CardType): CardType[] => {
  let column = gameCards.find((col) => col.includes(card));
  if (!!column) {
    return column;
  }
  if (deckDisplayed.includes(card)) {
    return deckDisplayed;
  }
  column = Object.values(colorsPlaceholder).find((col) => col.includes(card));
  if (!!column) {
    return column;
  }
  return []; // neut peut techniquement pas se produire
}

const getTopCard = (card: CardType): CardType => {
  const column = getColumn(card);
  return column[column.length - 1];
}

const pickFromDeck = () => {
  if (deck.length <= gameMode && deck.length > 0) {
    deck.reverse().forEach(card => {
      card.hidden = false;
      deckDisplayed.push(card);
    });
    deck.splice(0, deck.length);
  } else if (deck.length === 0) {
    deck.push(...deckDisplayed.reverse());
    deck.forEach(card => {
      card.hidden = true;
    });
    deckDisplayed.splice(0, deckDisplayed.length);
  } else {
    for (let i = 0; i < gameMode; i++) {
      deck[deck.length - 1].hidden = false;
      deckDisplayed.push(deck.pop() as CardType);
    }
    deckDisplayed.forEach(card => {
      card.active = false;
    });
  }
}

const placeholderClicked = (color: Symbol) => {
  const placeHolderColumn = colorsPlaceholder[color];
  const [activeCard, activeColumn] = getActive();
  if (!!activeCard && !!activeColumn) {
    if (placeHolderColumn.length === 0 && activeCard.value === CardValue[0]) {
      placeHolderColumn.push(activeCard);
      activeCard.active = false;
      activeColumn.splice(activeColumn.indexOf(activeCard));
    } else if (placeHolderColumn.length > 0) {
      const lastCard = placeHolderColumn[placeHolderColumn.length - 1];
      if (canStackInPlaceHolder(activeCard, lastCard)) {
        placeHolderColumn.push(activeCard);
        activeCard.active = false;
        activeColumn.splice(activeColumn.indexOf(activeCard));
      }
    }
  }
}

const selectCard = (card: CardType) => {
  const [activeCard, activeColumn] = getActive();
  const topCard = getTopCard(card);
  const column = getColumn(card);
  if (column === deckDisplayed) {
    card = getTopCard(card);
  }
  if (!!activeCard && activeCard !== card && !!activeColumn) {
    if (column === activeColumn) {
      activeCard.active = false;
      card.active = true;
    } else {
      if (gameCards.includes(column)) {
        if (canStackOn(activeCard, topCard)) {
          const cardIndex = column.indexOf(card);
          const activeCardIndex = activeColumn.indexOf(activeCard);
          if (cardIndex !== undefined && activeCardIndex !== undefined) {
            const cardsToMove = activeColumn.splice(activeCardIndex);
            column.push(...cardsToMove);
            activeCard.active = false;
          }
        } else {
          activeCard.active = false;
        }
      } else if (Object.values(colorsPlaceholder).includes(column)) {
        if (canStackInPlaceHolder(activeCard, topCard)) {
          column.push(activeCard);
          activeColumn.splice(activeColumn.indexOf(activeCard));
          activeCard.active = false;
        } else {
          activeCard.active = false;
        }
      } else if (column === deckDisplayed) {

        activeCard.active = false;
        card.active = true;
      }
    }
  } else {
    card.active = !card.active;
  }
}

const colClicked = (colIndex: number) => {
  const [activeCard, activeColumn] = getActive();
  const column = gameCards[colIndex];
  if (column.length === 0) {
    if (!!activeCard && !!activeColumn) {
      activeCard.active = false;
      if (activeCard.value === CardValue[12]) {
        column.push(...activeColumn.splice(activeColumn.indexOf(activeCard)));
      }
    }
    return;
  }
  // TODO : faire la fonction movecard moveCard(card, column);
}

onMounted(async () => {
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = deck.pop() as CardType;
      if (j === i) {
        card.hidden = false;
      }
      await sleep(50);
      gameCards[j].push(card);
    }
  }
  mounted.value = true;
})

const quickWin = () => {
  while (gameCards.some((cards) => cards.length > 0)) {
    gameCards.reverse().forEach(async (cards) => {
      const card = cards.pop();
      if (!!card) {
        await sleep(100);
        colorsPlaceholder[card.symbol].push(card);
      }
    });
  }
}

</script>

<template>
  <!-- <DndProvider :backend="HTML5Backend"> -->
  <main class="game">
    <button v-if="isQuickWin" class="absolute right-10 top-10 bg-white rounded-md py-1 px-2" @click="quickWin">Click to win</button>
    <div class="grid upper border border-red-500">
      <div class="deck-area broder border-white">
        <div class="deck border border-lime-500" @click="pickFromDeck">
          <Card v-for="(card, index) in deck" :value="card" />
        </div>
        <div class="deck-displayed border border-lime-500">
          <Card v-for="(card, index) in deckDisplayed" :value="card" @selected="selectCard" />
        </div>
      </div>
      <div class="colors border border-cyan-400">
        <div v-for="(placeholder, color) in  colorsPlaceholder " :class="`placeholder-${color}`"
          @click="() => placeholderClicked(color)" class="placeholder border border-purple-500">
          <Card v-for="(card, index) in placeholder" :value="card" @selected="selectCard" />
        </div>
      </div>
    </div>
    <div class="grid board border border-blue-600">
      <div v-for=" columnCards, colIndex  in  gameCards " class="border border-yellow-400"
        @click="() => colClicked(colIndex)">
        <Card v-for=" card, index  in  columnCards " :value="card" :marginTop="index" @selected="selectCard" />
      </div>
    </div>
  </main>
  <!-- </DndProvider> -->
</template>