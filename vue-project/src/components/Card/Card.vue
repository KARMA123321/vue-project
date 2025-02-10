<script setup lang="ts">
defineProps<{
  id: number;
  title: string;
  content?: string;
}>();
</script>

<template>
  <div class="card-wrapper">
    <h3 class="title">{{ title }}</h3>
    <p :class="['content', { placeholder: !content }]" >{{ content || "Enter the description here..." }}</p>
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
}

.title,
.content {
  background-color: var(--main-bg-color);
  padding: 2.5px;
  border-radius: 5px;
  padding: 10px;
}

.content {
  flex: 1;
  overflow-y: auto;
}

.content.placeholder {
  color: var(--secondary-text-color);
}
</style>
