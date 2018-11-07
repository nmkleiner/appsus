"use strict";

import router from "./routes.js";
import eventBus, { Back_TO_APPSUS } from "../mainservices/event-bus.service.js";
import emailCompose from '/misterEmail/js/cmps/email-compose.cmp.js'

// import userMsg from './cmps/user-msg.js'

new Vue({
  el: "#app",
  router,
  components: {
    // userMsg
    emailCompose
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
  }
});
