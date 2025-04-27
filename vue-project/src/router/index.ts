import { createRouter, createWebHistory } from "vue-router";
import AuthView from "@/views/AuthView/AuthView.vue";
import MainView from "@/views/MainView/MainView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/auth",
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/main",
      name: "main",
      component: MainView,
    },
  ],
});

router.beforeEach((to, _, next) => {
  const { isAuthenticated } = useAuthStore();

  if (to.name === "auth" && isAuthenticated) {
    next({ name: "main" });
  } else {
    next();
  }
});

export default router;
