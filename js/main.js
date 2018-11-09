"use strict";

import router from "./routes.js";
import eventBus, { Back_TO_APPSUS, APP_CREATED } from "../mainservices/event-bus.service.js";

new Vue({
  el: "#app",
  router,
  components: {
  },
  data() {
    return {
      isMainPage: true
    };
  },
  created() {
    eventBus.$on(Back_TO_APPSUS, () => {
      this.isMainPage = true;
    });
    eventBus.$on(APP_CREATED, () => {
      this.isMainPage = false;
    })
  }
});
