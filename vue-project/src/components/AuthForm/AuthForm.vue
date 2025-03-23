<script setup lang="ts">
import { users } from "@/constants/auth-data";
import { useAuthStore } from "@/stores/auth";
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  email: String,
  password: String,
});

const router = useRouter();

const authData = ref<typeof props>({
  email: props.email,
  password: props.password,
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
      <input v-model.lazy.trim="authData.email" type="email" id="email" name="email" required />
    </div>
    <div class="input">
      <label for="password">Password</label>
      <input
        v-model.lazy="authData.password"
        type="password"
        id="password"
        name="password"
        required
      />
    </div>
    <input
      type="submit"
      value="Submit"
      :class="{ highlight: authData.email && authData.password }"
    />
    <p :class="['msg', { visible: isError }]">
      {{ "Login or password is incorrect" }}
    </p>
  </form>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-width: 80%;
}

.input {
  display: flex;
  flex-direction: column;
  width: 90%;
}

.highlight {
  animation: blink 1.5s linear infinite;
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
  text-align: center;
}

.msg.visible {
  visibility: visible;
}

@keyframes blink {
  0% {
    box-shadow: 0px 0px 0px 2px whitesmoke;
  }
  50% {
    box-shadow: 0px 0px 2px 4px whitesmoke;
  }
  100% {
    box-shadow: 0px 0px 4px 6px whitesmoke;
  }
}
</style>
