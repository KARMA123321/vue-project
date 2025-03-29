<script setup lang="ts">
import { useCardEditStore } from "@/stores/card";
import { useCardId } from "@/composables/card/useCardId";
const { edit } = useCardEditStore();
</script>

<template>
  <div class="add-card-wrapper" @click="edit(useCardId())">
    <span>+</span>
  </div>
</template>

<style lang="css" scoped>
.add-card-wrapper {
  background-color: var(--secondary-bg-color);
  border-radius: 10px;
  border: 3px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;  
}

.add-card-wrapper:hover {
  border: 3px solid var(--border-primary-color);
}

span {
  color: var(--main-bg-color);
  font-weight: 700;
  font-size: 128px;
}
</style>
