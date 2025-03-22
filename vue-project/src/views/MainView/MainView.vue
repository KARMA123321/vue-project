<script setup lang="ts">
import CardList from "@/components/CardList/CardList.vue";
import { type CardProps } from "@/components/Card/props";
import { computed, watch } from "vue";
import { useCardEditStore, useCardsStore } from "@/stores/card";
import CardModal from "@/components/CardModal/CardModal.vue";
import { storeToRefs } from "pinia";

const cards: CardProps[] = [
  { id: 1, title: "Card 1", content: "This is the first card" },
  { id: 2, title: "Card 2", content: "This is the second card" },
  { id: 3, title: "Card 3", content: "This is the third card" },
  { id: 4, title: "Card 4", content: "This is the fourth card" },
  { id: 5, title: "Card 5", content: "" },
  {
    id: 6,
    title: "Card 6",
    content:
      "This is the sixth cardThis is the sixth cardThis is the sixth cardThis is the sixth cardThis is the sixth cardThis is the sixth cardThis is the sixth cardThis is the sixth cardThis is the sixth card",
  },
];

const { currentCards, setCards } = useCardsStore();
const { cardId } = storeToRefs(useCardEditStore());
const isModalOpened = computed(() => cardId.value !== null);

watch(
  currentCards,
  () => {
    setCards(cards);
  },
  { immediate: true, once: true },
);
</script>

<template>
  <div :class="['main-view-wrapper', { 'modal-opened': isModalOpened }]">
    <CardList class="list" :cards="currentCards"></CardList>
  </div>
  <CardModal
    v-if="isModalOpened"
    v-bind="currentCards.find((card) => card.id === cardId) ?? { id: 0, title: '' }"
  />
</template>

<style lang="css" scoped>
.main-view-wrapper {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.list {
  width: 80%;
  margin-block-start: 50px;
}

.modal-opened {
  overflow-x: hidden;
}
</style>
