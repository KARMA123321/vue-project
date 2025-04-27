import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isAuthenticated = ref(false);

    function logIn() {
      isAuthenticated.value = true;
    }

    function logOut() {
      isAuthenticated.value = false;
    }

    return { isAuthenticated, logIn, logOut };
  },
  { persist: true },
);
