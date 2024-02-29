<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import GameMode from '@/types/Game';

const { setGameMode } = useGameStore();

const toggleGameMode = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  setGameMode(parseInt(target.value) as GameMode);
}

const { label } = defineProps<{
  label: string;
  reset?: boolean;
}>();

</script>

<template>
  <div class="flex flex-col">
    <label for="game-mode" class="mb-2">{{ label }}</label>
    <select id="game-mode" @change="toggleGameMode">
      <option :value="GameMode.EASY">Easy</option>
      <option :value="GameMode.HARD">Hard</option>
    </select>
    <a v-if="reset" href="/game" class="bg-blue-500 rounded-md py-2 px-1 text-white mt-3 mb-2">Start the game !</a>
    <router-link v-else to="/game" class="bg-blue-500 rounded-md py-2 px-1 text-white mt-3 mb-2">Start the game
      !</router-link>

  </div>
</template>
