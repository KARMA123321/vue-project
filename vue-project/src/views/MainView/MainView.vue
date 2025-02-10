<script setup lang="ts">
import CardList from "@/components/CardList/CardList.vue";
import type { CardProps } from "@/components/Card/props";
import { ref, type Ref } from "vue";

const cards: Ref<CardProps[]> = ref([
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
]);
</script>

<template>
  <div class="main-view-wrapper">
    <CardList class="list" :cards="cards"></CardList>
  </div>
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
}
</style>
