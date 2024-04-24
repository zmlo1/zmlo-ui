import "element-plus/dist/index.css";
import "./style.css";

import { createApp } from "vue";
import ElementPlus from "element-plus";
import MlUI from "./components";

import App from "./App.vue";

async function bootstrap() {
  const app = createApp(App);

  app.use(ElementPlus);

  app.use(MlUI);

  app.mount("#app");
}

bootstrap();
