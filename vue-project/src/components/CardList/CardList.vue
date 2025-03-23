<script setup lang="ts">
import AddCard from "../AddCard/AddCard.vue";
import Card from "../Card/Card.vue";
import { type CardProps } from "../Card/props";

defineProps<{ cards: CardProps[] }>();
</script>

<template>
  <div class="card-list-wrapper">
    <Card
      class="card"
      v-for="card in cards"
      v-bind="card"
    />
    <AddCard class="card"></AddCard>
  </div>
</template>

<style lang="css" scoped>
.card-list-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, max-content));
  gap: 80px;
  justify-content: center;
}

.card {
  height: 300px;
  width: 300px;
}
</style>
