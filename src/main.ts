import "element-plus/dist/index.css";
import "./style.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";

import App from "./App.vue";

async function bootstrap() {
  const app = createApp(App);

  app.use(ElementPlus);

  app.mount("#app");
}

bootstrap();
