"use strict";
import eventBus, { EMAIL_SENT } from "../../../mainservices/event-bus.service.js";

export default {
  template: `
    <section>
        <header>
            <router-link to="/email">
            <button class="btn btn-sm btn-dark">
                <i class="fas fa-arrow-circle-left"></i>
            </button>
        </router-link>
    </header>
    <div class="email-compose d-flex flex-column">
        <form @submit.prevent="submitForm">
            <div class="text-container">
                <input type="text" class="text-input" v-model="email.subject" placeholder="subject">
            </div>
            
            <div class="textarea-container">
                <textarea cols="30" class="textarea" v-model="email.body" rows="10" placeholder="content..."></textarea>
            </div>
            <router-link class="align-self-end" to="/email">
                <button class="btn btn-danger btn-sm" @click="submitForm">send</button>
            </router-link>
        </form>
    </div>

    </section>
    `,
  data() {
    return {
      email: {
        subject: "",
        body: "",
        isRead: false,
        timeSent: null
      }
    };
  },
  methods: {
    submitForm() {
        this.email.timeSent = Date.now()
      eventBus.$emit(EMAIL_SENT, this.email);
    }
  }
};
