<script setup lang="ts">
import AddCard from "../AddCard/AddCard.vue";
import Card from "../Card/Card.vue";
import { type CardProps } from "../Card/props";
import { useCardEditStore } from "@/stores/card";

const { edit } = useCardEditStore();

defineProps<{ cards: CardProps[] }>();
</script>

<template>
  <div class="card-list-wrapper">
    <Card
      class="card"
      v-for="card in cards"
      v-bind="card"
      @click="edit(card.id)"
    />
    <AddCard class="card"></AddCard>
  </div>
</template>

<style lang="css" scoped>
.card-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
}

.card {
  height: 300px;
  width: 300px;
}
</style>
