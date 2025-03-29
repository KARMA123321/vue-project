import { useCardsStore } from "@/stores/card";

export function useCardId(): number {
  const { currentCards } = useCardsStore();

  return currentCards.length ? currentCards[currentCards.length - 1].id + 1 : 1
}