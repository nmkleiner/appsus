"use strict";
import eventBus, { Back_TO_APPSUS, APP_CREATED,  EMAIL_DELETED, EMAIL_SENT, EMAIL_READ } from "/mainservices/event-bus.service.js";
import emailList from "../cmps/email-list.cmp.js";
import emailDetails from "../cmps/email-details.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import emailSort from "../cmps/email-sort.cmp.js";
import emailStatus from "../cmps/email-status.cmp.js";
import emailService from "../services/email.service.js";

export default {
  template: `
    <section class="email-app d-flex flex-column justify-content-center">
        <header class="d-flex justify-content-between">
        <div class="btns-container">
          <router-link   to="/">
              <div class="btn btn-sm btn-dark" @click="backToAppsus">
                <i class="fas fa-arrow-circle-left"></i>
              </div>
            </router-link>
            <router-link   to="/note">
              <div class="btn btn-sm btn-dark" @click="backToAppsus">
                Go To Notes
              </div>
          </router-link>
        </div>  
        </header>
        <div class="sub-header d-flex">
          <email-filter @filtered="setFilter"></email-filter>
          <email-sort @subject-sorted="sortSubject" @time-sorted="sortTime"></email-sort>
          <div class="button btn-dark d-flex align-items-center">
            <router-link to="/compose">
                <button class="btn btn-sm btn-danger">
                    <i class="fas fa-plus"></i>
                </button>
            </router-link>
          </div>
        </div>

        <div class="list-details-container d-flex">
          <div class="side-container d-flex flex-column-reverse flex-md-column">
            <email-list @email-selected="selectEmail" :emails="emails"></email-list>
            <email-status v-if="emails.length"></email-status>
          </div>
          
          <email-details :email="selectedEmail"></email-details>
        </div>
    </section>
    `,
  data() {
    return {
      emails: [
        { subject: "1", body: "12oasdnfoanfoadnf", isRead: false, timeSent: null },
        { subject: "2", body: "23adsfadfadsfadf", isRead: true, timeSent: null }
      ],
      filter: null,
      selectedEmail: { subject: "1", body: "12oasdnfoanfoadnf", isRead: false },
      sortedBy: 'time'
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
      emailService.query(filter).then(emails => {
        this.filter = filter
        this.emails = emails;
      });
    },
    sortTime() {
      if (this.sortedBy !== 'time') {
        this.sortNew()
        this.sortedBy = 'time'
      }
      else {
        this.emails.reverse()
      }
    },
    sortNew() {
      this.emails.sort((email1,email2) => email1.timeSent - email2.timeSent).reverse()
    },
    sortSubject() {
      if (this.sortedBy !== 'subject') {
        this.sortABC()
        this.sortedBy = 'subject'
      }
      else {
        this.emails.reverse()
      }
    },
    sortABC() {
      this.emails.sort((email1, email2) => {
        var subj1 = email1.subject.toLowerCase();
        var subj2 = email2.subject.toLowerCase();
        if (subj1 < subj2) return -1;
        if (subj1 > subj2) return 1;
        return 0;
    }); 
    }
  },
  created() {
    eventBus.$emit(APP_CREATED);

    var emails = emailService.query();
    emails.then(emails => {
      this.emails = emails;
      this.sortNew()
      this.selectedEmail = this.emails[0];
    });

    eventBus.$on(EMAIL_DELETED, emailId => {
      if (this.emails.length === 1) {
        emailService.deleteEmail(emailId).then(() => {
          this.emails = [];
          this.selectedEmail = {subject: 'No more emails, go to the beach!', timeSent: 0};
        });
      } else {
        var emails;
        emailService.deleteEmail(emailId).then(() => {
          emails = emailService.query(this.filter);
          emails.then(emails => {
            this.emails = emails;
            this.selectedEmail = emails[0]
          });
        });
      }
    });

    eventBus.$on(EMAIL_SENT, email => {
      emailService.saveEmail(email);
      emails = emailService.query();
      emails.then(emails => {
        this.emails = emails;
      });
    });

    eventBus.$on(EMAIL_READ, (email,isReadOnly) => {
      if(isReadOnly) {
        email.isRead = true
      }
      // console.log(isReadOnly)
      emailService.saveEmail(email).then(() =>{
        emails = emailService.query(this.filter);
        emails.then(emails => {
          this.emails = emails;
        });
      });
    });
    
  },
  components: {
    emailList,
    emailDetails,
    emailFilter,
    emailSort,
    emailStatus
  }
};
