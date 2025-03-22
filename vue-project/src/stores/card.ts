import { ref } from "vue";
import { defineStore } from "pinia";
import { type CardProps } from "@/components/Card/props";

export const useCardEditStore = defineStore("cardEdit", () => {
  const cardId = ref<number | null>(null);

  function edit(id: number) {
    cardId.value = id;
  }

  function stopEdit() {
    cardId.value = null;
  }

  return { cardId, edit, stopEdit };
});

export const useCardsStore = defineStore("cards", () => {
  const currentCards = ref<CardProps[]>([]);

  function setCard(card: CardProps) {
    const index = currentCards.value.findIndex((c) => c.id === card.id);

    if (index !== -1) currentCards.value[index] = { ...card };
    else currentCards.value.push(card);
  }

  function setCards(cards: CardProps[]) {
    cards.forEach((c) => setCard(c));
  }

  return { currentCards, setCard, setCards };
});
