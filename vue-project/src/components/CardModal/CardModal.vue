<script setup lang="ts">
import { useCardEditStore, useCardsStore } from '@/stores/card';
import { type CardProps } from '../Card/props';
import { computed, ref, useTemplateRef, watch } from 'vue';
import { getRemValue } from '@/constants/helpers';

const props = defineProps<CardProps>();

const card = ref<CardProps>({ ...props });

watch(() => props, (newProps) => {
  card.value = { ...newProps };
}, { deep: true, immediate: true });

const { stopEdit } = useCardEditStore();
const { setCard } = useCardsStore();

const form = useTemplateRef("form");
const formHeight = computed(() => form.value?.getBoundingClientRect().height ?? 1);

const rem = getRemValue();

function handleSubmit() {
  setCard(card.value);
  stopEdit();
};
</script>

<template>
  <div class="modal">
    <form class="edit-form" ref="form" @submit.prevent="handleSubmit">
      <button class="close" @click="stopEdit">X</button>
      <div class="title">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" v-model.trim="card.title"></input>
      </div>
      <div class="content">
        <label for="content">Content</label>
        <textarea id="content" name="content" :rows="formHeight * 0.4 / rem" v-model.trim="card.content"></textarea>
      </div>
      <input type="submit" value="Save" />
    </form>
  </div>
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

.title,
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
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
</style>