<script setup lang="ts">
import { useCardEditStore, useCardsStore } from "@/stores/card";
import { computed, ref } from "vue";

const props = defineProps<{
  id: number;
  title: string;
  content?: string;
}>();

const actualContent = computed(() =>
  !props.content ? "Enter the description here" : props.content,
);

const { edit } = useCardEditStore();
const { removeCard } = useCardsStore();

const hovered = ref(false);

function toggleHovered(e: MouseEvent) {
  e.preventDefault();
  hovered.value = !hovered.value;
}
</script>

<template>
  <div
    class="card-wrapper"
    @mouseenter="toggleHovered"
    @mouseleave="toggleHovered"
    @click="edit(id)"
  >
    <div class="title-wrapper">
      <h3 class="title">{{ title }}</h3>
      <div class="delete-btn" v-if="hovered" @click.stop="removeCard(id)">
        <h3>X</h3>
      </div>
    </div>
    <p :class="['content', { placeholder: !content }]">{{ actualContent }}</p>
  </div>
</template>

<style lang="css" scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: var(--secondary-bg-color);
  border-radius: 10px;
  border: 3px solid transparent;
}

.card-wrapper:hover {
  border: 3px solid var(--border-primary-color);
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.title,
.content,
.delete-btn {
  background-color: var(--main-bg-color);
  border-radius: 5px;
  padding: 10px;
}

.title {
  flex: 1.8;
  text-wrap: balance;
}

.content {
  flex: 1;
  overflow-y: auto;
  text-wrap: pretty;
  text-align: justify;
}

.content.placeholder {
  color: var(--secondary-text-color);
}

.delete-btn {
  flex: 0.2;
  text-align: center;
  color: whitesmoke;
  background-color: var(--high-attention-color);
  user-select: none;
}
</style>
