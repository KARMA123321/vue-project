<script setup lang="ts">
import { users } from "@/constants/auth-data";
import { useAuthStore } from "@/stores/auth";
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const { email, password} = defineProps({
  email: String,
  password: String,
});

const router = useRouter();

const authData = ref({
  email,
  password,
});
const isError = ref(false);

const auth = useAuthStore();

function submitHandler() {
  if (
    users.valid.find(
      (user) => user.email === authData.value.email && user.password === authData.value.password,
    )
  ) {
    auth.logIn();
    router.push("/main");
  } else {
    isError.value = true;
  }
}
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div class="input">
      <label for="email">Email</label>
      <input v-model.lazy.trim="authData.email" type="email" id="email" name="email" />
    </div>
    <div class="input">
      <label for="password">Password</label>
      <input v-model.lazy="authData.password" type="password" id="password" name="password" />
    </div>
    <input type="submit" value="Submit" />
    <p class="msg" :class="{ visible: isError }">
      {{ "Login or password is incorrect" }}
    </p>
  </form>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input {
  display: flex;
  flex-direction: column;
}

input[type="submit"] {
  margin-block-start: 20px;
  width: 6rem;
  height: 2rem;
  align-self: center;
  border-radius: 5px;
}

.msg {
  align-self: center;
  visibility: hidden;
  color: var(--fail-font-color);
  background-color: white;
  border-radius: 5px;
  padding: 5px;
}

.msg.visible {
  visibility: visible;
}
</style>
