import { ref } from 'vue';
import { defineStore } from 'pinia';
import GameMode from '@/types/Game';

export const useGameStore = defineStore('game', () => {
  const gameMode = ref<GameMode>(GameMode.EASY);

  function setGameMode(mode: GameMode) {
    gameMode.value = mode;
  };

  return { gameMode, setGameMode };
})
