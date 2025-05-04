<script setup lang="ts">
import { useCardEditStore, useCardsStore } from '@/stores/card';
import { type CardProps } from '../Card/props';
import { ref, watch } from 'vue';

const props = defineProps<CardProps>();

const card = ref<CardProps>({ ...props });

watch(() => props, (newProps) => {
  card.value = { ...newProps };
}, { deep: true, immediate: true });

const { stopEdit } = useCardEditStore();
const { setCard } = useCardsStore();

function handleSubmit() {
  setCard(card.value);
  stopEdit();
};
</script>

<template>
  <Teleport to="body"">
    <div class="modal">
      <form class="edit-form" ref="form" @submit.prevent="handleSubmit">
        <button class="close" @click="stopEdit">X</button>
        <div class="title">
          <label for="title">Title</label>
        <input type="text" id="title" name="title" v-model.trim="card.title" required></input>
        </div>
        <div class="content">
          <label for="content">Description</label>
          <textarea id="content" name="content" v-model.trim="card.content"></textarea>
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  </Teleport>
</template>

<style lang="css" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--secondary-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 35px 15px;
  background-color: hsla(0deg 0% 60% / 100%);
  border-radius: 10px;
  width: 60%;
  height: 60%;
}

@media (max-width: 1024px) {
  .edit-form {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

.title,
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}

.content {
  height: 75%;
}

.close {
  position: absolute;
  right: 15px;
  top: 15px;
}

[type='submit'] {
  position: absolute;
  left: 15px;
  bottom: 15px;
}

textarea {
  width: 100%;
  height: 100%;
  resize: none;
}
</style>