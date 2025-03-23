import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
// @ts-ignore
import VueMobileDetection from "vue-mobile-detection";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(VueMobileDetection);

app.use(createPinia());
app.use(router);

app.mount("#app");
