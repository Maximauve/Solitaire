<script setup lang="ts">
import { Symbol } from '@/types/Card';
import HeartSvg from '@/assets/images/heart.svg';
import SpadeSvg from '@/assets/images/spade.svg';
import DiamondSvg from '@/assets/images/diamond.svg';
import ClubSvg from '@/assets/images/club.svg';
import '@/assets/styles/card.scss';
import { ref } from 'vue';
// import { useDrag } from 'vue3-dnd';

const { symbol, value, margin, id } = defineProps<{
  symbol: Symbol;
  value: string;
  margin?: number;
  id: string;
  hidden?: boolean;
}>();

const card = ref();

// const [collectedProps, dragSource] = useDrag(() => ({
//   type: 'BOX',
//   item: { id },
//   collect: (monitor) => {
//     return {
//       isDragging: monitor.isDragging(),
//     };
//   }
// }))

const svg = {
  [Symbol.HEART]: HeartSvg,
  [Symbol.SPADE]: SpadeSvg,
  [Symbol.DIAMOND]: DiamondSvg,
  [Symbol.CLUB]: ClubSvg,
};

const color = {
  [Symbol.HEART]: 'red',
  [Symbol.SPADE]: 'black',
  [Symbol.DIAMOND]: 'red',
  [Symbol.CLUB]: 'black',
};

</script>

<template>
  <div v-if="!hidden" class="card" :class="color[symbol]" :style="margin ? `margin-top: ${margin + 1 * margin}rem;` : ''"
    :ref="card">
    <div>
      <span>{{ value }}</span>
      <img :src="svg[symbol]" />
    </div>
    <div class="middle">
      <span>{{ value }}</span>
    </div>
    <div>
      <span>{{ value }}</span>
      <img :src="svg[symbol]" />
    </div>
  </div>

  <div v-else class="card hidden" :style="margin ? `margin-top: ${margin + 1 * margin}rem;` : ''"></div>
</template>