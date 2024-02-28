import { ref } from 'vue';
import { defineStore } from 'pinia';
import Theme from '@/types/Theme';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(Theme.LIGHT);

  function switchToDark() {
    theme.value = Theme.DARK;
  };

  function switchToLight() {
    theme.value = Theme.LIGHT;
  };

  return { theme, switchToDark, switchToLight };
})
