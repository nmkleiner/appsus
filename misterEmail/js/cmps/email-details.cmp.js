import emailService from "../services/email.service.js";
import eventBus, { APP_CREATED } from "/mainservices/event-bus.service.js";

"use strict";

export default {
  props: ["email"],
  template: `
    <section class="email-details" :class="{fullScreen: isFullScreen}">

      <div class="btns-container">

        <router-link v-if="isFullScreen" to="/email">
          <button class="btn btn-dark">
          <i class="fas fa-arrow-circle-left"></i>            
          </button>
        </router-link>
        
        <button class="btn btn-dark">
          <input type="color" v-model="prefs.color">
          <i class="fas fa-pencil-alt"></i>
        </button>

        <button class="btn btn-dark">          
          <input type="color" v-model="prefs.backgroundColor">
          <i class="fas fa-palette"></i>
        </button>

        <button type="button" class="btn btn-md btn-dark" 
            @click="fontSize--">
            <i class="fas fa-font fa-sm"></i>
        </button>
        <button type="button" class="btn btn-md btn-dark" 
            @click="fontSize++">
          <i class="fas fa-font fa-lg"></i>
        </button>

        <router-link v-if="!isFullScreen":to="'/email/' + email.id">
          <button class="btn btn-dark">
            <i class="fas fa-arrows-alt"></i>
          </button>
        </router-link>


      </div>
      
      <div class="text-container" :style="{backgroundColor : prefs.backgroundColor,
         color: prefs.color,
         fontSize: fontSize +'px'
        }">
        <span v-if="email.timeSent">Subject:</span>
         <span class="subject">{{email.subject}}</span><br>
         <span v-if="email.timeSent">Sent at: {{timeToShow}}</span>
         <br> {{email.body}}
      </div>

    </section>
    `,
  computed: {
    timeToShow() {
      return moment(this.email.timeSent).format("MM/DD/YY hh:mm a");
    },
  },
  data() {
    return {
      prefs: {
        backgroundColor: "#ffffff",
        color: "#000000",
      },
      fontSize: 16,
      isFullScreen: false,
      // email: {}
    };
  },
  
  created() {
    eventBus.$emit(APP_CREATED);

    if (!this.email) {
      this.isFullScreen = true;
      const emailId = this.$route.params.emailId;
      emailService.getById(emailId)
      .then(email => this.email = email)
    }

  }
}
