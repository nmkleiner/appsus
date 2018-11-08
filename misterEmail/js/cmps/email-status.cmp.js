"use strict";
import emailService from "../services/email.service.js";
import eventBus, { EMAIL_DELETED, EMAIL_READ } from "/mainservices/event-bus.service.js";

export default {
  template: `
    <section class="email-status">
        <div class="outer d-flex">
        <!-- <span>{{progress}}%</span> -->
                <div class="progress align-self-center" :style="{ width: progress + '%', backgroundColor: progressColor}"></div>
        </div>
    </section>
    `,
  data() {
    return {
      emails: [],
      progress: 1,
      progressColor: "red"
    };
  },
  methods: {
    getEmails() {
      var emails = emailService.query();
      emails.then(emails => {
        this.emails = emails;
        this.progress = this.updateProgress();
        this.progressColor = this.updateProgressColor();
      });
    },
    updateProgress() {
      var readenCount = this.emails.filter(email => email.isRead).length;
      if (!readenCount) return 1;
      return Math.round((readenCount / this.emails.length) * 100);
    },
    updateProgressColor() {
      if (this.progress < 30) return "red";
      if (this.progress < 65) return "yellow";
      return "green";
    }
  },
  created() {
    this.getEmails();

    eventBus.$on(EMAIL_DELETED, () => {
      this.getEmails();
    });
    eventBus.$on(EMAIL_READ, () => {
      this.getEmails();
    });

  }
};
