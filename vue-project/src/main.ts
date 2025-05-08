import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueMobileDetection from "vue-mobile-detection";

import App from "./App.vue";
import router from "./router";

if (import.meta.env.MODE === "development") {
  const { worker } = await import("./mocks/browser.ts");

  worker.start();
}

const app = createApp(App);
app.use(VueMobileDetection);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(router);

app.mount("#app");
