<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Symbol } from '@/types/Card';
import { CardValue } from '@/constants/Card';
import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const cards = [
  { symbol: Symbol.HEART, value: CardValue[13], hidden: true },
  { symbol: Symbol.CLUB, value: CardValue[12], hidden: true },
  { symbol: Symbol.HEART, value: CardValue[11], hidden: true },
  { symbol: Symbol.CLUB, value: CardValue[10], hidden: true },
  { symbol: Symbol.HEART, value: CardValue[9] },
  { symbol: Symbol.CLUB, value: CardValue[8] },
  { symbol: Symbol.HEART, value: CardValue[7] },
  { symbol: Symbol.CLUB, value: CardValue[6] },
  { symbol: Symbol.HEART, value: CardValue[5] },
  { symbol: Symbol.CLUB, value: CardValue[4] },
  { symbol: Symbol.HEART, value: CardValue[3] },
  { symbol: Symbol.CLUB, value: CardValue[2] },
  { symbol: Symbol.HEART, value: CardValue[1] },
];

const SelectCard = (e: any) => {
  console.log('SelectCard');
  console.log(e);
}

</script>

<template>
  <DndProvider :backend="HTML5Backend">
    <main class="game">
      <div class="grid upper border border-red-500">
        <div class="deck-area broder border-white">
          <div class="deck border border-lime-500"></div>
          <div class="deck-displayed border border-lime-500"></div>
        </div>
        <div class="colors border border-cyan-400">
          <div class="placeholder placeholder-hearts border border-purple-500"></div>
          <div class="placeholder placeholder-spades border border-purple-500"></div>
          <div class="placeholder placeholder-diamonds border border-purple-500"></div>
          <div class="placeholder placeholder-clubs border border-purple-500"></div>
        </div>
      </div>
      <div class="grid board border border-blue-600">
        <div class="border border-yellow-400">
          <Card v-for="card, index in cards" :symbol="card.symbol" :value="card.value" :hidden="!!card.hidden"
            :id="index.toString()" :margin="index" v-on:selected="SelectCard" />
        </div>
        <div class="border border-yellow-400">
          <Card :symbol="Symbol.SPADE" :value="CardValue[13]" :hidden="true" :margin="0" />
          <Card :symbol="Symbol.SPADE" :value="CardValue[13]" :hidden="true" :margin="1" />
          <Card :symbol="Symbol.SPADE" :value="CardValue[13]" :hidden="true" :margin="2" />
          <Card :symbol="Symbol.SPADE" :value="CardValue[13]" :hidden="true" :margin="3" />
          <Card :symbol="Symbol.SPADE" :value="CardValue[13]" :hidden="true" :margin="4" />
          <Card :symbol="Symbol.SPADE" :value="CardValue[13]" :hidden="true" :margin="5" />
        </div>
        <div class="border border-yellow-400"></div>
        <div class="border border-yellow-400"></div>
        <div class="border border-yellow-400"></div>
        <div class="border border-yellow-400"></div>
        <div class="border border-yellow-400"></div>
      </div>
    </main>
  </DndProvider>
</template>