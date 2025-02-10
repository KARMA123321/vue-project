<script setup lang="ts">
import AuthForm from "@/components/AuthForm/AuthForm.vue";

const defaultAuthData = {
  email: "admin@admin.ru",
  password: "123",
};
</script>

<template>
  <main>
    <div class="wrapper">
      <h1>Welcome here!</h1>
      <AuthForm class="form" v-bind="defaultAuthData" />
    </div>
  </main>
</template>

<style lang="css" scoped>
h1 {
  margin-block-end: 20px;
  text-align: center;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form {
  margin-left: auto;
  margin-right: auto;
}

.wrapper {
  width: 30%;
  border-radius: 20px;
  background-color: var(--secondary-bg-color);
  padding: 50px;
  padding-block-end: 30px;
}
</style>
