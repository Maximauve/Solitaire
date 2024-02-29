<script setup lang="ts">
import { Symbol, type CardType } from '@/types/Card';
import HeartSvg from '@/assets/images/heart.svg';
import SpadeSvg from '@/assets/images/spade.svg';
import DiamondSvg from '@/assets/images/diamond.svg';
import ClubSvg from '@/assets/images/club.svg';
import '@/assets/styles/card.scss';
import { ref, type VNode, type VNodeRef } from 'vue';
// import { useDrag } from 'vue3-dnd';

const { value, marginTop, id } = defineProps<{
  value: CardType;
  marginTop?: number;
  marginLeft?: number;
  id?: string;
}>();

const formatStyle = (marginTop: number | undefined, marginLeft: number | undefined): string => {
  if (!!marginTop && !!marginLeft) {
    return `margin-top: ${marginTop + 1 * marginTop}rem; margin-left: ${marginLeft}rem;`;
  }
  if (!!marginTop) {
    return `margin-top: ${marginTop + 1 * marginTop}rem;`;
  }
  return `margin-left: ${marginLeft}rem;`;
};

const emit = defineEmits(['selected', 'rightClicked']);

const SelectCard = () => {
  console.log('simple click');
  emit('selected', value);
}

const RightClicked = (e: MouseEvent) => {
  e.preventDefault();
  console.log('right click');
  emit('rightClicked', value);
}

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

</script>

<template>
  <div v-if="!value.hidden" class="card" :class="value.symbol, value.active && 'active'"
    :style="formatStyle(marginTop, marginLeft)" @click="SelectCard" @contextmenu="RightClicked">
    <div>
      <span>{{ value.value }}</span>
      <img :src="svg[value.symbol]" />
    </div>
    <div class="middle">
      <span>{{ value.value }}</span>
    </div>
    <div>
      <span>{{ value.value }}</span>
      <img :src="svg[value.symbol]" />
    </div>
  </div>

  <div v-else class="card hidden" :style="formatStyle(marginTop, marginLeft)"></div>
</template>