<script setup lang="ts">
import Card from "../Card/Card.vue";
import { type CardProps } from "../Card/props";

defineProps<{ cards: CardProps[] }>();
</script>

<template>
  <div class="card-list-wrapper">
    <Card class="card" v-for="card in cards" v-bind="card" />
  </div>
</template>

<style lang="css" scoped>
.card-list-wrapper {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media (max-width: 400px) {
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.card {
  height: 300px;
  width: 300px;
}
</style>
