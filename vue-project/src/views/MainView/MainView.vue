<script setup lang="ts">
import CardList from "@/components/CardList/CardList.vue";
import { type CardProps } from "@/components/Card/props";
import { computed, watch, watchEffect } from "vue";
import { useCardEditStore, useCardsStore } from "@/stores/card";
import CardModal from "@/components/CardModal/CardModal.vue";
import { storeToRefs } from "pinia";
import { useCardId } from "@/composables/card/useCardId";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
];


const { logOut } = useAuthStore();
const router = useRouter();
const { currentCards, setCards } = useCardsStore();
const { cardId } = storeToRefs(useCardEditStore());
const isModalOpened = computed(() => cardId.value !== null);

function exitHandler() {
  logOut();
  router.replace("/");
}

watch(
  currentCards,
  () => {
    setCards(cards);
  },
  { immediate: true, once: true },
);

watchEffect(() => {
  if (isModalOpened.value) {
    document.getElementById("app")!.style.overflow = "hidden";
  } else {
    document.getElementById("app")!.style.overflow = "";
  }
});
</script>

<template>
  <button class="exit-btn" @click="exitHandler">Exit</button>
  <div class="main-view-wrapper">
    <CardList class="list" :cards="currentCards"></CardList>
  </div>
  <CardModal
    v-if="isModalOpened"
    v-bind="
      currentCards.find((card) => card.id === cardId) ?? {
        id: useCardId(),
        title: '',
      }
    "
  />
</template>

<style lang="css" scoped>
.main-view-wrapper {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 50px;
  min-height: 100%;
}

.list {
  width: 80%;
}

.exit-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.25rem;
  font-weight: 700;
  background-color: var(--secondary-bg-color);
  color: var(--primary-text-color);
  border: none;
  border-radius: 5px;
  border: 3px solid transparent;
  padding: 10px 20px;
}

.exit-btn:hover {
  border: 3px solid var(--border-warning-color);
}
</style>
