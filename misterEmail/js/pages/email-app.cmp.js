"use strict";
import eventBus, { Back_TO_APPSUS } from "/mainservices/event-bus.service.js";
import { EMAIL_DELETED } from "/mainservices/event-bus.service.js";

import emailList from "../cmps/email-list.cmp.js";
import emailDetails from "../cmps/email-details.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";
// import emailStatus from '../cmps/email-status.cmp.js'
import emailService from "../services/email.service.js";

export default {
  template: `
    <section class="email-app">
        <header>
          <router-link   to="/">
          <div class="btn btn-sm btn-dark" @click="backToAppsus">
            <i class="fas fa-arrow-circle-left"></i>
          </div>
        </router-link>
          
          <router-link   to="/compose">
            <button class="btn btn-sm btn-danger">Compose</button>
          </router-link>

        

        </header>
        
        <email-filter @filtered="setFilter"></email-filter>

        <div class="list-details-container d-flex">
          <email-list @email-selected="selectEmail" :emails="emails"></email-list>
          <email-details :email="selectedEmail"></email-details>
        </div>


          
          <!-- <keep-alive>
            <email-compose></email-compose>
          </keep-alive> -->

        <footer>
          <!-- <email-status></email-status> -->
        </footer>
    </section>
    `,
  data() {
    return {
      // emails: null,
      emails: [
        { subject: "1", body: "12oasdnfoanfoadnf", isRead: false },
        { subject: "2", body: "23adsfadfadsfadf", isRead: true }
      ],
      filter: null,
      selectedEmail: { subject: "1", body: "12oasdnfoanfoadnf", isRead: false }
    };
  },
  methods: {
    backToAppsus() {
      eventBus.$emit(Back_TO_APPSUS);
    },
    selectEmail(email) {
      this.selectedEmail = email;
    },
    setFilter(filter) {
      emailService.query(filter)
      .then(emails => {
        this.emails = emails})
    }
  },
  created() {
    var emails = emailService.query();
    emails.then(emails => {
      this.emails = emails;
      this.selectedEmail = this.emails[0];
    });

    eventBus.$on(EMAIL_DELETED, emailId => {
      if (this.emails.length === 1) {
        emailService.deleteEmail(emailId).then(() => {
          this.emails = [];
          this.selectedEmail = "";
        });
      } else {
        var emails;
        emailService.deleteEmail(emailId).then(() => {
          emails = emailService.query();
          emails.then(emails => {
            this.emails = emails;
          });
        });
      }
    });
  },
  components: {
    emailList,
    emailDetails,
    emailFilter
    // emailCompose,
    // emailStatus
  }
};
