<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import GameMode from '@/types/Game';

const { setGameMode } = useGameStore();

const toggleGameMode = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  console.log(target.value);
  setGameMode(parseInt(target.value) as GameMode);
}

</script>

<template>
  <main>
    <h1>coucou</h1>
    <label for="game-mode">Select a gamemode</label>
    <select id="game-mode" @change="toggleGameMode">
      <option :value="GameMode.EASY">Easy</option>
      <option :value="GameMode.HARD">Hard</option>
    </select>
    <router-link to="/game">Start the game !</router-link>

  </main>
</template>
